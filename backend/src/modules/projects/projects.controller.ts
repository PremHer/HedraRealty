import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResponse<ProjectEntity>> {
    return this.projectsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectEntity> {
    return this.projectsService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectsService.create(payload);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateProjectDto
  ): Promise<ProjectEntity> {
    return this.projectsService.update(id, payload);
  }
}
