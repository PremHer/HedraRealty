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
import { GeneratedContractEntity } from './generated-contract.entity';

@Entity({ name: 'contract_templates' })
export class ContractTemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'project_id', type: 'uuid' })
  projectId!: string;

  @ManyToOne(() => ProjectEntity, (project) => project.contractTemplates, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'project_id' })
  project?: ProjectEntity;

  @Column({ length: 200 })
  name!: string;

  @Column({ type: 'text' })
  body!: string;

  @Column({ type: 'text', array: true, default: () => 'ARRAY[]::text[]' })
  placeholders!: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => GeneratedContractEntity, (contract) => contract.template)
  generatedContracts?: GeneratedContractEntity[];
}
