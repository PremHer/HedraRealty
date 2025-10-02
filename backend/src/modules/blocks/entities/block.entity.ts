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

@Entity({ name: 'blocks' })
export class BlockEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'project_id', type: 'uuid' })
  projectId!: string;

  @ManyToOne(() => ProjectEntity, (project) => project.blocks, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'project_id' })
  project?: ProjectEntity;

  @Column({ length: 20 })
  code!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'lot_count', type: 'int', default: 0 })
  lotCount!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => LotEntity, (lot) => lot.block)
  lots?: LotEntity[];
}
