import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateContractTemplateDto } from './dto/create-contract-template.dto';
import { GenerateContractDto } from './dto/generate-contract.dto';
import { UpdateContractTemplateDto } from './dto/update-contract-template.dto';
import { ContractTemplate, GeneratedContract } from './entities/contract-template.entity';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get('templates')
  listTemplates(
    @Query() query: PaginationQueryDto,
    @Query('projectId') projectId?: string
  ): PaginatedResponse<ContractTemplate> {
    return this.contractsService.listTemplates({ ...query, projectId });
  }

  @Post('templates')
  createTemplate(@Body() payload: CreateContractTemplateDto): ContractTemplate {
    return this.contractsService.createTemplate(payload);
  }

  @Patch('templates/:id')
  updateTemplate(
    @Param('id') id: string,
    @Body() payload: UpdateContractTemplateDto
  ): ContractTemplate {
    return this.contractsService.updateTemplate(id, payload);
  }

  @Post('generate')
  generateContract(@Body() payload: GenerateContractDto): GeneratedContract {
    return this.contractsService.generateContract(payload);
  }
}
