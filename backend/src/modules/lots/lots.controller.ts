import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { CreateLotDto } from './dto/create-lot.dto';
import { LotsQueryDto } from './dto/lots-query.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { LotEntity } from './entities/lot.entity';
import { LotsService } from './lots.service';

@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  @Get()
  async findAll(@Query() query: LotsQueryDto): Promise<PaginatedResponse<LotEntity>> {
    return this.lotsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LotEntity> {
    return this.lotsService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateLotDto): Promise<LotEntity> {
    return this.lotsService.create(payload);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateLotDto): Promise<LotEntity> {
    return this.lotsService.update(id, payload);
  }
}
