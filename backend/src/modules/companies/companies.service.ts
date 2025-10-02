import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  private companies: Company[] = [
    {
      id: 'comp-hedra',
      name: 'Hedra Realty SAC',
      ruc: '20601234567',
      legalAddress: 'Av. Principal 123, Lima',
      generalManagerId: 'user-gm-1',
      createdAt: new Date('2024-01-10T15:00:00Z')
    }
  ];

  findAll(query: PaginationQueryDto): PaginatedResponse<Company> {
    const { page = 1, limit = 25, search } = query;
    let filtered = this.companies;

    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter((company) =>
        [company.name, company.ruc].some((field) => field.toLowerCase().includes(lower))
      );
    }

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return {
      data,
      total: filtered.length,
      page,
      limit
    };
  }

  findOne(id: string): Company {
    const company = this.companies.find((item) => item.id === id);

    if (!company) {
      throw new NotFoundException(`La empresa con id ${id} no existe`);
    }

    return company;
  }

  create(payload: CreateCompanyDto): Company {
    const newCompany: Company = {
      ...payload,
      id: randomUUID(),
      createdAt: new Date()
    };

    this.companies.push(newCompany);
    return newCompany;
  }

  update(id: string, payload: UpdateCompanyDto): Company {
    const company = this.findOne(id);
    const updated: Company = { ...company, ...payload };

    this.companies = this.companies.map((item) => (item.id === id ? updated : item));

    return updated;
  }
}
