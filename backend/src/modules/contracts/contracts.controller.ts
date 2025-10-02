import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateContractTemplateDto } from './dto/create-contract-template.dto';
import { GenerateContractDto } from './dto/generate-contract.dto';
import { UpdateContractTemplateDto } from './dto/update-contract-template.dto';
import { ContractTemplateEntity } from './entities/contract-template.entity';
import { GeneratedContractEntity } from './entities/generated-contract.entity';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get('templates')
  async listTemplates(
    @Query() query: PaginationQueryDto,
    @Query('projectId') projectId?: string
  ): Promise<PaginatedResponse<ContractTemplateEntity>> {
    return this.contractsService.listTemplates({ ...query, projectId });
  }

  @Post('templates')
  async createTemplate(
    @Body() payload: CreateContractTemplateDto
  ): Promise<ContractTemplateEntity> {
    return this.contractsService.createTemplate(payload);
  }

  @Patch('templates/:id')
  async updateTemplate(
    @Param('id') id: string,
    @Body() payload: UpdateContractTemplateDto
  ): Promise<ContractTemplateEntity> {
    return this.contractsService.updateTemplate(id, payload);
  }

  @Post('generate')
  async generateContract(
    @Body() payload: GenerateContractDto
  ): Promise<GeneratedContractEntity> {
    return this.contractsService.generateContract(payload);
  }
}
