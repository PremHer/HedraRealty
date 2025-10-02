import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { CreateCashflowEntryDto } from './dto/create-cashflow-entry.dto';
import { CreateFinancingPlanDto } from './dto/create-financing-plan.dto';
import { ListCashflowQueryDto } from './dto/list-cashflow-query.dto';
import { ListPlansQueryDto } from './dto/list-plans-query.dto';
import { UpdateCashflowEntryDto } from './dto/update-cashflow-entry.dto';
import { UpdateFinancingPlanDto } from './dto/update-financing-plan.dto';
import { CashflowEntryEntity } from './entities/cashflow-entry.entity';
import { FinancingPlanEntity } from './entities/financing-plan.entity';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('plans')
  async listPlans(
    @Query() query: ListPlansQueryDto
  ): Promise<PaginatedResponse<FinancingPlanEntity>> {
    return this.financeService.listPlans(query);
  }

  @Post('plans')
  async createPlan(@Body() payload: CreateFinancingPlanDto): Promise<FinancingPlanEntity> {
    return this.financeService.createPlan(payload);
  }

  @Patch('plans/:id')
  async updatePlan(
    @Param('id') id: string,
    @Body() payload: UpdateFinancingPlanDto
  ): Promise<FinancingPlanEntity> {
    return this.financeService.updatePlan(id, payload);
  }

  @Get('cashflow')
  async listCashflow(
    @Query() query: ListCashflowQueryDto
  ): Promise<PaginatedResponse<CashflowEntryEntity>> {
    return this.financeService.listCashflow(query);
  }

  @Post('cashflow')
  async createCashflowEntry(
    @Body() payload: CreateCashflowEntryDto
  ): Promise<CashflowEntryEntity> {
    return this.financeService.createCashflowEntry(payload);
  }

  @Patch('cashflow/:id')
  async updateCashflowEntry(
    @Param('id') id: string,
    @Body() payload: UpdateCashflowEntryDto
  ): Promise<CashflowEntryEntity> {
    return this.financeService.updateCashflowEntry(id, payload);
  }
}
