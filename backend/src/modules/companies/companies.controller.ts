import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResponse<CompanyEntity>> {
    return this.companiesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CompanyEntity> {
    return this.companiesService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateCompanyDto): Promise<CompanyEntity> {
    return this.companiesService.create(payload);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateCompanyDto
  ): Promise<CompanyEntity> {
    return this.companiesService.update(id, payload);
  }
}
