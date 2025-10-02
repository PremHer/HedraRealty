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
import { FinancingPlanEntity } from '../../finance/entities/financing-plan.entity';
import { GeneratedContractEntity } from '../../contracts/entities/generated-contract.entity';
import { ProjectEntity } from '../../projects/entities/project.entity';

export enum LotStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  SOLD = 'sold'
}

@Entity({ name: 'lots' })
export class LotEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'block_id', type: 'uuid' })
  blockId!: string;

  @ManyToOne(() => BlockEntity, (block) => block.lots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'block_id' })
  block?: BlockEntity;

  @Column({ name: 'project_id', type: 'uuid' })
  projectId!: string;

  @ManyToOne(() => ProjectEntity, (project) => project.lots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project?: ProjectEntity;

  @Column({ length: 50 })
  code!: string;

  @Column({ name: 'area_m2', type: 'numeric', precision: 10, scale: 2 })
  areaM2!: number;

  @Column({ name: 'price_pen', type: 'numeric', precision: 12, scale: 2 })
  pricePen!: number;

  @Column({ type: 'enum', enum: LotStatus, default: LotStatus.AVAILABLE })
  status!: LotStatus;

  @Column({ name: 'financing_plan_id', type: 'uuid', nullable: true })
  financingPlan?: string;

  @ManyToOne(() => FinancingPlanEntity, (plan) => plan.lots, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'financing_plan_id' })
  financingPlanEntity?: FinancingPlanEntity | null;

  @Column({ name: 'buyer_id', nullable: true, length: 120 })
  buyerId?: string;

  @Column({ name: 'reservation_date', type: 'timestamp with time zone', nullable: true })
  reservationDate?: Date;

  @Column({ name: 'sale_date', type: 'timestamp with time zone', nullable: true })
  saleDate?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => GeneratedContractEntity, (contract) => contract.lot)
  generatedContracts?: GeneratedContractEntity[];
}
