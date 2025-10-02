import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { LotEntity } from '../../lots/entities/lot.entity';
import { ProjectEntity } from '../../projects/entities/project.entity';
import { ContractTemplateEntity } from './contract-template.entity';

@Entity({ name: 'generated_contracts' })
export class GeneratedContractEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'project_id', type: 'uuid' })
  projectId!: string;

  @ManyToOne(() => ProjectEntity, (project) => project.generatedContracts, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'project_id' })
  project?: ProjectEntity;

  @Column({ name: 'lot_id', type: 'uuid' })
  lotId!: string;

  @ManyToOne(() => LotEntity, (lot) => lot.generatedContracts, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'lot_id' })
  lot?: LotEntity | null;

  @Column({ name: 'buyer_id', length: 120 })
  buyerId!: string;

  @Column({ name: 'template_id', type: 'uuid' })
  templateId!: string;

  @ManyToOne(() => ContractTemplateEntity, (template) => template.generatedContracts, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'template_id' })
  template?: ContractTemplateEntity | null;

  @Column({ name: 'generated_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  generatedAt!: Date;

  @Column({ type: 'text' })
  content!: string;
}
