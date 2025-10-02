import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateContractTemplateDto } from './dto/create-contract-template.dto';
import { GenerateContractDto } from './dto/generate-contract.dto';
import { UpdateContractTemplateDto } from './dto/update-contract-template.dto';
import { ContractTemplate, GeneratedContract } from './entities/contract-template.entity';

@Injectable()
export class ContractsService {
  private templates: ContractTemplate[] = [
    {
      id: 'template-promesa',
      projectId: 'proj-luna-azul',
      name: 'Promesa de compraventa',
      body: 'Contrato entre {{companyName}} y {{buyerName}} para el lote {{lotCode}}.',
      placeholders: ['companyName', 'buyerName', 'lotCode', 'pricePen', 'planName'],
      createdAt: new Date('2024-02-18T15:00:00Z')
    }
  ];

  private generatedContracts: GeneratedContract[] = [];

  listTemplates(
    query: PaginationQueryDto & { projectId?: string }
  ): PaginatedResponse<ContractTemplate> {
    const { page = 1, limit = 25, projectId } = query;
    let filtered = this.templates;

    if (projectId) {
      filtered = filtered.filter((template) => template.projectId === projectId);
    }

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total: filtered.length, page, limit };
  }

  createTemplate(payload: CreateContractTemplateDto): ContractTemplate {
    const template: ContractTemplate = {
      ...payload,
      id: randomUUID(),
      createdAt: new Date()
    };

    this.templates.push(template);
    return template;
  }

  updateTemplate(id: string, payload: UpdateContractTemplateDto): ContractTemplate {
    const template = this.templates.find((item) => item.id === id);

    if (!template) {
      throw new NotFoundException(`El formato con id ${id} no existe`);
    }

    const updated: ContractTemplate = { ...template, ...payload };
    this.templates = this.templates.map((item) => (item.id === id ? updated : item));

    return updated;
  }

  generateContract(payload: GenerateContractDto): GeneratedContract {
    const template = this.templates.find((item) => item.id === payload.templateId);

    if (!template) {
      throw new NotFoundException(`El formato con id ${payload.templateId} no existe`);
    }

    const content = template.body
      .replace('{{lotCode}}', payload.lotId)
      .replace('{{buyerName}}', payload.buyerId)
      .replace('{{companyName}}', 'Hedra Realty')
      .replace('{{pricePen}}', '0.00')
      .replace('{{planName}}', 'Plan de Referencia');

    const contract: GeneratedContract = {
      id: randomUUID(),
      projectId: payload.projectId,
      lotId: payload.lotId,
      buyerId: payload.buyerId,
      templateId: payload.templateId,
      generatedAt: new Date(),
      content
    };

    this.generatedContracts.push(contract);
    return contract;
  }
}
