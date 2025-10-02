import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto): PaginatedResponse<Company> {
    return this.companiesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Company {
    return this.companiesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCompanyDto): Company {
    return this.companiesService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCompanyDto): Company {
    return this.companiesService.update(id, payload);
  }
}
