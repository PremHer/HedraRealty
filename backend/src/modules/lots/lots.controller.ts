import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { Lot, LotStatus } from './entities/lot.entity';
import { LotsService } from './lots.service';

@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  @Get()
  findAll(
    @Query() query: PaginationQueryDto,
    @Query('projectId') projectId?: string,
    @Query('blockId') blockId?: string,
    @Query('status') status?: string
  ): PaginatedResponse<Lot> {
    const parsedStatus =
      status && Object.values(LotStatus).includes(status as LotStatus)
        ? (status as LotStatus)
        : undefined;

    return this.lotsService.findAll({ ...query, projectId, blockId, status: parsedStatus });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Lot {
    return this.lotsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateLotDto): Lot {
    return this.lotsService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateLotDto): Lot {
    return this.lotsService.update(id, payload);
  }
}
