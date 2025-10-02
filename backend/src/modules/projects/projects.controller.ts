import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto): PaginatedResponse<Project> {
    return this.projectsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Project {
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProjectDto): Project {
    return this.projectsService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProjectDto): Project {
    return this.projectsService.update(id, payload);
  }
}
