import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { ProjectEntity } from '../../projects/entities/project.entity';

@Entity({ name: 'companies' })
@Unique(['ruc'])
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  name!: string;

  @Column({ length: 11 })
  ruc!: string;

  @Column({ name: 'legal_address', length: 300 })
  legalAddress!: string;

  @Column({ name: 'general_manager_id', length: 120 })
  generalManagerId!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => ProjectEntity, (project) => project.company)
  projects?: ProjectEntity[];
}
