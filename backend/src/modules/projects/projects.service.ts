import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity, ProjectType } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>
  ) {}

  async findAll(query: PaginationQueryDto): Promise<PaginatedResponse<ProjectEntity>> {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(Number(query.limit) || 25, 100));

    const where = query.search
      ? [{ name: ILike(`%${query.search.trim()}%`) }]
      : undefined;

    const [data, total] = await this.projectsRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit
    });

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<ProjectEntity> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`El proyecto con id ${id} no existe`);
    }

    return project;
  }

  async create(payload: CreateProjectDto): Promise<ProjectEntity> {
    const project = this.projectsRepository.create({
      ...payload,
      type: payload.type as ProjectType,
      services: payload.services ?? [],
      amenities: payload.amenities ?? [],
      documentation: payload.documentation ?? [],
      deliveryWorks: payload.deliveryWorks ?? [],
      launchDate: payload.launchDate ? new Date(payload.launchDate) : undefined
    });

    return this.projectsRepository.save(project);
  }

  async update(id: string, payload: UpdateProjectDto): Promise<ProjectEntity> {
    const updatePayload: Partial<ProjectEntity> = {};
    const { launchDate, type, ...rest } = payload;

    Object.assign(updatePayload, rest);

    if (type) {
      updatePayload.type = type as ProjectType;
    }

    if (launchDate) {
      updatePayload.launchDate = new Date(launchDate);
    }

    const project = await this.projectsRepository.preload({ id, ...updatePayload });

    if (!project) {
      throw new NotFoundException(`El proyecto con id ${id} no existe`);
    }

    return this.projectsRepository.save(project);
  }
}
