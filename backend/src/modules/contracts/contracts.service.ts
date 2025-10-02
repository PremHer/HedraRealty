import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateContractTemplateDto } from './dto/create-contract-template.dto';
import { GenerateContractDto } from './dto/generate-contract.dto';
import { UpdateContractTemplateDto } from './dto/update-contract-template.dto';
import { ContractTemplateEntity } from './entities/contract-template.entity';
import { GeneratedContractEntity } from './entities/generated-contract.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(ContractTemplateEntity)
    private readonly templatesRepository: Repository<ContractTemplateEntity>,
    @InjectRepository(GeneratedContractEntity)
    private readonly generatedRepository: Repository<GeneratedContractEntity>
  ) {}

  async listTemplates(
    query: PaginationQueryDto & { projectId?: string }
  ): Promise<PaginatedResponse<ContractTemplateEntity>> {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(Number(query.limit) || 25, 100));

    const qb = this.templatesRepository.createQueryBuilder('template');

    if (query.projectId) {
      qb.where('template.project_id = :projectId', { projectId: query.projectId });
    }

    const [data, total] = await qb
      .orderBy('template.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit };
  }

  async createTemplate(payload: CreateContractTemplateDto): Promise<ContractTemplateEntity> {
    const template = this.templatesRepository.create({
      ...payload,
      placeholders: payload.placeholders ?? []
    });

    return this.templatesRepository.save(template);
  }

  async updateTemplate(
    id: string,
    payload: UpdateContractTemplateDto
  ): Promise<ContractTemplateEntity> {
    const template = await this.templatesRepository.preload({ id, ...payload });

    if (!template) {
      throw new NotFoundException(`El formato con id ${id} no existe`);
    }

    return this.templatesRepository.save(template);
  }

  async generateContract(payload: GenerateContractDto): Promise<GeneratedContractEntity> {
    const template = await this.templatesRepository.findOne({ where: { id: payload.templateId } });

    if (!template) {
      throw new NotFoundException(`El formato con id ${payload.templateId} no existe`);
    }

    const replacements: Record<string, string> = {
      lotCode: payload.lotId,
      buyerName: payload.buyerId,
      companyName: 'Hedra Realty',
      pricePen: '0.00',
      planName: 'Plan de Referencia'
    };

    let content = template.body;
    for (const placeholder of template.placeholders ?? []) {
      const value = replacements[placeholder] ?? '';
      const pattern = new RegExp(`{{\\s*${placeholder}\\s*}}`, 'g');
      content = content.replace(pattern, value);
    }

    const contract = this.generatedRepository.create({
      projectId: payload.projectId,
      lotId: payload.lotId,
      buyerId: payload.buyerId,
      templateId: template.id,
      content
    });

    return this.generatedRepository.save(contract);
  }
}
