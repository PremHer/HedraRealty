import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateCashflowEntryDto } from './dto/create-cashflow-entry.dto';
import { CreateFinancingPlanDto } from './dto/create-financing-plan.dto';
import { UpdateCashflowEntryDto } from './dto/update-cashflow-entry.dto';
import { UpdateFinancingPlanDto } from './dto/update-financing-plan.dto';
import { CashflowEntry, CashflowEntryType } from './entities/cashflow-entry.entity';
import { FinancingPlan, FinancingPlanType } from './entities/financing-plan.entity';

@Injectable()
export class FinanceService {
  private financingPlans: FinancingPlan[] = [
    {
      id: 'plan-frances',
      projectId: 'proj-luna-azul',
      name: 'Plan Francés 120 cuotas',
      planType: FinancingPlanType.FRANCES,
      interestRateAnnual: 12.5,
      gracePeriodMonths: 0,
      installments: 120,
      allowZeroDownPayment: false,
      penaltyRateMonthly: 3.5,
      currency: 'PEN',
      createdAt: new Date('2024-02-15T10:00:00Z')
    },
    {
      id: 'plan-contado',
      projectId: 'proj-luna-azul',
      name: 'Venta al contado',
      planType: FinancingPlanType.CONTADO,
      interestRateAnnual: 0,
      gracePeriodMonths: 0,
      installments: 1,
      allowZeroDownPayment: false,
      penaltyRateMonthly: 0,
      currency: 'PEN',
      createdAt: new Date('2024-02-15T10:00:00Z')
    }
  ];

  private cashflowEntries: CashflowEntry[] = [
    {
      id: 'cf-1',
      projectId: 'proj-luna-azul',
      date: new Date('2024-02-15T10:00:00Z'),
      type: CashflowEntryType.INGRESO,
      description: 'Cobro inicial lote A-01',
      amount: 15000,
      currency: 'PEN',
      reference: 'lot-a-01'
    },
    {
      id: 'cf-2',
      projectId: 'proj-luna-azul',
      date: new Date('2024-02-20T10:00:00Z'),
      type: CashflowEntryType.EGRESO,
      description: 'Pago contratista veredas',
      amount: -8200,
      currency: 'PEN',
      reference: 'obra-veredas-2024'
    }
  ];

  listPlans(
    query: PaginationQueryDto & { projectId?: string; planType?: FinancingPlanType }
  ): PaginatedResponse<FinancingPlan> {
    const { page = 1, limit = 25, projectId, planType } = query;
    let filtered = this.financingPlans;

    if (projectId) {
      filtered = filtered.filter((plan) => plan.projectId === projectId);
    }

    if (planType) {
      filtered = filtered.filter((plan) => plan.planType === planType);
    }

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total: filtered.length, page, limit };
  }

  createPlan(payload: CreateFinancingPlanDto): FinancingPlan {
    const plan: FinancingPlan = {
      ...payload,
      id: randomUUID(),
      currency: 'PEN',
      createdAt: new Date()
    };

    this.financingPlans.push(plan);
    return plan;
  }

  updatePlan(id: string, payload: UpdateFinancingPlanDto): FinancingPlan {
    const plan = this.financingPlans.find((item) => item.id === id);

    if (!plan) {
      throw new NotFoundException(`El plan con id ${id} no existe`);
    }

    const updated: FinancingPlan = { ...plan, ...payload };
    this.financingPlans = this.financingPlans.map((item) => (item.id === id ? updated : item));

    return updated;
  }

  listCashflow(
    query: PaginationQueryDto & { projectId?: string; type?: CashflowEntryType }
  ): PaginatedResponse<CashflowEntry> {
    const { page = 1, limit = 25, projectId, type } = query;
    let filtered = this.cashflowEntries;

    if (projectId) {
      filtered = filtered.filter((entry) => entry.projectId === projectId);
    }

    if (type) {
      filtered = filtered.filter((entry) => entry.type === type);
    }

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total: filtered.length, page, limit };
  }

  createCashflowEntry(payload: CreateCashflowEntryDto): CashflowEntry {
    const entry: CashflowEntry = {
      ...payload,
      id: randomUUID(),
      currency: 'PEN',
      date: new Date(payload.date)
    };

    this.cashflowEntries.push(entry);
    return entry;
  }

  updateCashflowEntry(id: string, payload: UpdateCashflowEntryDto): CashflowEntry {
    const entry = this.cashflowEntries.find((item) => item.id === id);

    if (!entry) {
      throw new NotFoundException(`El movimiento con id ${id} no existe`);
    }

    const updated: CashflowEntry = {
      ...entry,
      ...payload,
      date: payload.date ? new Date(payload.date) : entry.date
    };

    this.cashflowEntries = this.cashflowEntries.map((item) => (item.id === id ? updated : item));

    return updated;
  }
}
