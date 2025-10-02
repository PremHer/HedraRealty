import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProjectEntity } from '../../projects/entities/project.entity';

export enum CashflowEntryType {
  INGRESO = 'ingreso',
  EGRESO = 'egreso'
}

@Entity({ name: 'cashflow_entries' })
export class CashflowEntryEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'project_id', type: 'uuid' })
  projectId!: string;

  @ManyToOne(() => ProjectEntity, (project) => project.cashflowEntries, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'project_id' })
  project?: ProjectEntity;

  @Column({ type: 'timestamp with time zone' })
  date!: Date;

  @Column({ type: 'enum', enum: CashflowEntryType })
  type!: CashflowEntryType;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  amount!: number;

  @Column({ length: 3, default: 'PEN' })
  currency!: string;

  @Column({ nullable: true, length: 120 })
  reference?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
