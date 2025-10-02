import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateCashflowEntryDto } from './dto/create-cashflow-entry.dto';
import { CreateFinancingPlanDto } from './dto/create-financing-plan.dto';
import { UpdateCashflowEntryDto } from './dto/update-cashflow-entry.dto';
import { UpdateFinancingPlanDto } from './dto/update-financing-plan.dto';
import { CashflowEntry, CashflowEntryType } from './entities/cashflow-entry.entity';
import { FinancingPlan, FinancingPlanType } from './entities/financing-plan.entity';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('plans')
  listPlans(
    @Query() query: PaginationQueryDto,
    @Query('projectId') projectId?: string,
    @Query('planType') planType?: string
  ): PaginatedResponse<FinancingPlan> {
    const parsedType =
      planType && Object.values(FinancingPlanType).includes(planType as FinancingPlanType)
        ? (planType as FinancingPlanType)
        : undefined;

    return this.financeService.listPlans({ ...query, projectId, planType: parsedType } as any);
  }

  @Post('plans')
  createPlan(@Body() payload: CreateFinancingPlanDto): FinancingPlan {
    return this.financeService.createPlan(payload);
  }

  @Patch('plans/:id')
  updatePlan(@Param('id') id: string, @Body() payload: UpdateFinancingPlanDto): FinancingPlan {
    return this.financeService.updatePlan(id, payload);
  }

  @Get('cashflow')
  listCashflow(
    @Query() query: PaginationQueryDto,
    @Query('projectId') projectId?: string,
    @Query('type') type?: string
  ): PaginatedResponse<CashflowEntry> {
    const parsedType =
      type && Object.values(CashflowEntryType).includes(type as CashflowEntryType)
        ? (type as CashflowEntryType)
        : undefined;

    return this.financeService.listCashflow({ ...query, projectId, type: parsedType });
  }

  @Post('cashflow')
  createCashflowEntry(@Body() payload: CreateCashflowEntryDto): CashflowEntry {
    return this.financeService.createCashflowEntry(payload);
  }

  @Patch('cashflow/:id')
  updateCashflowEntry(
    @Param('id') id: string,
    @Body() payload: UpdateCashflowEntryDto
  ): CashflowEntry {
    return this.financeService.updateCashflowEntry(id, payload);
  }
}
