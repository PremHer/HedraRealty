import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { CreateCashflowEntryDto } from './dto/create-cashflow-entry.dto';
import { CreateFinancingPlanDto } from './dto/create-financing-plan.dto';
import { ListCashflowQueryDto } from './dto/list-cashflow-query.dto';
import { ListPlansQueryDto } from './dto/list-plans-query.dto';
import { UpdateCashflowEntryDto } from './dto/update-cashflow-entry.dto';
import { UpdateFinancingPlanDto } from './dto/update-financing-plan.dto';
import { CashflowEntryEntity } from './entities/cashflow-entry.entity';
import { FinancingPlanEntity } from './entities/financing-plan.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(FinancingPlanEntity)
    private readonly financingPlansRepository: Repository<FinancingPlanEntity>,
    @InjectRepository(CashflowEntryEntity)
    private readonly cashflowRepository: Repository<CashflowEntryEntity>
  ) {}

  async listPlans(query: ListPlansQueryDto): Promise<PaginatedResponse<FinancingPlanEntity>> {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(Number(query.limit) || 25, 100));

    const qb = this.financingPlansRepository.createQueryBuilder('plan');

    if (query.projectId) {
      qb.where('plan.project_id = :projectId', { projectId: query.projectId });
    }

    if (query.planType) {
      qb.andWhere('plan.plan_type = :planType', { planType: query.planType });
    }

    const [data, total] = await qb
      .orderBy('plan.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit };
  }

  async createPlan(payload: CreateFinancingPlanDto): Promise<FinancingPlanEntity> {
    const plan = this.financingPlansRepository.create({
      ...payload,
      currency: 'PEN'
    });

    return this.financingPlansRepository.save(plan);
  }

  async updatePlan(id: string, payload: UpdateFinancingPlanDto): Promise<FinancingPlanEntity> {
    const plan = await this.financingPlansRepository.preload({ id, ...payload });

    if (!plan) {
      throw new NotFoundException(`El plan con id ${id} no existe`);
    }

    return this.financingPlansRepository.save(plan);
  }

  async listCashflow(
    query: ListCashflowQueryDto
  ): Promise<PaginatedResponse<CashflowEntryEntity>> {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(Number(query.limit) || 25, 100));

    const qb = this.cashflowRepository.createQueryBuilder('entry');

    if (query.projectId) {
      qb.where('entry.project_id = :projectId', { projectId: query.projectId });
    }

    if (query.type) {
      qb.andWhere('entry.type = :type', { type: query.type });
    }

    const [data, total] = await qb
      .orderBy('entry.date', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit };
  }

  async createCashflowEntry(payload: CreateCashflowEntryDto): Promise<CashflowEntryEntity> {
    const entry = this.cashflowRepository.create({
      ...payload,
      date: new Date(payload.date),
      currency: 'PEN'
    });

    return this.cashflowRepository.save(entry);
  }

  async updateCashflowEntry(
    id: string,
    payload: UpdateCashflowEntryDto
  ): Promise<CashflowEntryEntity> {
    const updatePayload: Partial<CashflowEntryEntity> = {};
    const { date, ...rest } = payload;

    Object.assign(updatePayload, rest);

    if (date) {
      updatePayload.date = new Date(date);
    }

    const entry = await this.cashflowRepository.preload({ id, ...updatePayload });

    if (!entry) {
      throw new NotFoundException(`El movimiento con id ${id} no existe`);
    }

    return this.cashflowRepository.save(entry);
  }
}
