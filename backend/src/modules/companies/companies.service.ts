import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companiesRepository: Repository<CompanyEntity>
  ) {}

  async findAll(query: PaginationQueryDto): Promise<PaginatedResponse<CompanyEntity>> {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(Number(query.limit) || 25, 100));

    const where: FindOptionsWhere<CompanyEntity>[] = [];

    if (query.search) {
      const searchTerm = `%${query.search.trim()}%`;
      where.push({ name: ILike(searchTerm) });
      where.push({ ruc: ILike(searchTerm) });
    }

    const [data, total] = await this.companiesRepository.findAndCount({
      where: where.length > 0 ? where : undefined,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit
    });

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<CompanyEntity> {
    const company = await this.companiesRepository.findOne({ where: { id } });

    if (!company) {
      throw new NotFoundException(`La empresa con id ${id} no existe`);
    }

    return company;
  }

  async create(payload: CreateCompanyDto): Promise<CompanyEntity> {
    const newCompany = this.companiesRepository.create(payload);
    return this.companiesRepository.save(newCompany);
  }

  async update(id: string, payload: UpdateCompanyDto): Promise<CompanyEntity> {
    const company = await this.companiesRepository.preload({ id, ...payload });

    if (!company) {
      throw new NotFoundException(`La empresa con id ${id} no existe`);
    }

    return this.companiesRepository.save(company);
  }
}
