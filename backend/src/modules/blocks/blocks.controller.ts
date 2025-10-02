import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { BlockEntity } from './entities/block.entity';
import { BlocksService } from './blocks.service';
import { BlocksQueryDto } from './dto/blocks-query.dto';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Get()
  async findAll(@Query() query: BlocksQueryDto): Promise<PaginatedResponse<BlockEntity>> {
    return this.blocksService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlockEntity> {
    return this.blocksService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateBlockDto): Promise<BlockEntity> {
    return this.blocksService.create(payload);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateBlockDto
  ): Promise<BlockEntity> {
    return this.blocksService.update(id, payload);
  }
}
