import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Block } from './entities/block.entity';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Get()
  findAll(
    @Query() query: PaginationQueryDto,
    @Query('projectId') projectId?: string
  ): PaginatedResponse<Block> {
    return this.blocksService.findAll({ ...query, projectId });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Block {
    return this.blocksService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBlockDto): Block {
    return this.blocksService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateBlockDto): Block {
    return this.blocksService.update(id, payload);
  }
}
