import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { ProjectEntity } from '../../projects/entities/project.entity';
import { LotEntity } from '../../lots/entities/lot.entity';

export enum FinancingPlanType {
  CONTADO = 'contado',
  FINANCIADO_INICIAL = 'financiado-inicial',
  FINANCIADO_SIN_INICIAL = 'financiado-sin-inicial',
  FRANCES = 'frances',
  ALEMAN = 'aleman',
  JAPONES = 'japones'
}

@Entity({ name: 'financing_plans' })
export class FinancingPlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'project_id', type: 'uuid' })
  projectId!: string;

  @ManyToOne(() => ProjectEntity, (project) => project.financingPlans, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'project_id' })
  project?: ProjectEntity;

  @Column({ length: 200 })
  name!: string;

  @Column({ name: 'plan_type', type: 'enum', enum: FinancingPlanType })
  planType!: FinancingPlanType;

  @Column({ name: 'interest_rate_annual', type: 'numeric', precision: 5, scale: 2 })
  interestRateAnnual!: number;

  @Column({ name: 'grace_period_months', type: 'int' })
  gracePeriodMonths!: number;

  @Column({ type: 'int' })
  installments!: number;

  @Column({ name: 'allow_zero_down_payment', type: 'boolean', default: false })
  allowZeroDownPayment!: boolean;

  @Column({ name: 'penalty_rate_monthly', type: 'numeric', precision: 5, scale: 2 })
  penaltyRateMonthly!: number;

  @Column({ length: 3, default: 'PEN' })
  currency!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => LotEntity, (lot) => lot.financingPlanEntity)
  lots?: LotEntity[];
}
