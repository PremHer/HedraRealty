import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { BlockEntity } from '../../blocks/entities/block.entity';
import { CashflowEntryEntity } from '../../finance/entities/cashflow-entry.entity';
import { FinancingPlanEntity } from '../../finance/entities/financing-plan.entity';
import { ContractTemplateEntity } from '../../contracts/entities/contract-template.entity';
import { GeneratedContractEntity } from '../../contracts/entities/generated-contract.entity';
import { LotEntity } from '../../lots/entities/lot.entity';
import { CompanyEntity } from '../../companies/entities/company.entity';

export enum ProjectType {
  LOTIZACION = 'lotizacion'
}

@Entity({ name: 'projects' })
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId!: string;

  @ManyToOne(() => CompanyEntity, (company) => company.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company?: CompanyEntity;

  @Column({ length: 200 })
  name!: string;

  @Column({ type: 'enum', enum: ProjectType, default: ProjectType.LOTIZACION })
  type!: ProjectType;

  @Column({ name: 'total_area_m2', type: 'numeric', precision: 12, scale: 2 })
  totalAreaM2!: number;

  @Column({ type: 'text', array: true, default: () => 'ARRAY[]::text[]' })
  services!: string[];

  @Column({ type: 'text', array: true, default: () => 'ARRAY[]::text[]' })
  amenities!: string[];

  @Column({ type: 'text', array: true, default: () => 'ARRAY[]::text[]' })
  documentation!: string[];

  @Column({ name: 'delivery_works', type: 'text', array: true, default: () => 'ARRAY[]::text[]' })
  deliveryWorks!: string[];

  @Column({ name: 'sales_progress', type: 'numeric', precision: 5, scale: 2, default: 0 })
  salesProgress!: number;

  @Column({ name: 'construction_progress', type: 'numeric', precision: 5, scale: 2, default: 0 })
  constructionProgress!: number;

  @Column({ name: 'manager_id', length: 120 })
  managerId!: string;

  @Column({ name: 'launch_date', type: 'timestamp with time zone', nullable: true })
  launchDate?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => BlockEntity, (block) => block.project)
  blocks?: BlockEntity[];

  @OneToMany(() => LotEntity, (lot) => lot.project)
  lots?: LotEntity[];

  @OneToMany(() => FinancingPlanEntity, (plan) => plan.project)
  financingPlans?: FinancingPlanEntity[];

  @OneToMany(() => CashflowEntryEntity, (entry) => entry.project)
  cashflowEntries?: CashflowEntryEntity[];

  @OneToMany(() => ContractTemplateEntity, (template) => template.project)
  contractTemplates?: ContractTemplateEntity[];

  @OneToMany(() => GeneratedContractEntity, (contract) => contract.project)
  generatedContracts?: GeneratedContractEntity[];
}
