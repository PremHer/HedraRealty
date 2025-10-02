import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    {
      id: 'proj-luna-azul',
      companyId: 'comp-hedra',
      name: 'Residencial Luna Azul',
      type: 'lotizacion',
      totalAreaM2: 120000,
      services: ['Agua', 'Alcantarillado', 'Electricidad'],
      amenities: ['Parque central', 'Club house'],
      documentation: ['Habilitación urbana', 'Planos aprobados'],
      deliveryWorks: ['Pistas y veredas', 'Alumbrado público'],
      salesProgress: 15,
      constructionProgress: 10,
      managerId: 'user-gm-1',
      launchDate: new Date('2024-03-01T00:00:00Z'),
      createdAt: new Date('2024-02-10T12:00:00Z')
    }
  ];

  findAll(query: PaginationQueryDto): PaginatedResponse<Project> {
    const { page = 1, limit = 25, search } = query;
    let filtered = this.projects;

    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter((project) => project.name.toLowerCase().includes(lower));
    }

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total: filtered.length, page, limit };
  }

  findOne(id: string): Project {
    const project = this.projects.find((item) => item.id === id);

    if (!project) {
      throw new NotFoundException(`El proyecto con id ${id} no existe`);
    }

    return project;
  }

  create(payload: CreateProjectDto): Project {
    const newProject: Project = {
      ...payload,
      id: randomUUID(),
      launchDate: payload.launchDate ? new Date(payload.launchDate) : undefined,
      createdAt: new Date()
    };

    this.projects.push(newProject);
    return newProject;
  }

  update(id: string, payload: UpdateProjectDto): Project {
    const project = this.findOne(id);
    const updated: Project = {
      ...project,
      ...payload,
      launchDate: payload.launchDate
        ? new Date(payload.launchDate)
        : project.launchDate
    };

    this.projects = this.projects.map((item) => (item.id === id ? updated : item));

    return updated;
  }
}
