import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { Lot, LotStatus } from './entities/lot.entity';

@Injectable()
export class LotsService {
  private lots: Lot[] = [
    {
      id: 'lot-a-01',
      blockId: 'block-a',
      projectId: 'proj-luna-azul',
      code: 'A-01',
      areaM2: 120,
      pricePen: 52000,
      status: LotStatus.AVAILABLE,
      createdAt: new Date('2024-02-12T10:30:00Z')
    }
  ];

  findAll(
    query: PaginationQueryDto & { projectId?: string; blockId?: string; status?: LotStatus }
  ): PaginatedResponse<Lot> {
    const { page = 1, limit = 25, search, projectId, blockId, status } = query;
    let filtered = this.lots;

    if (projectId) {
      filtered = filtered.filter((lot) => lot.projectId === projectId);
    }

    if (blockId) {
      filtered = filtered.filter((lot) => lot.blockId === blockId);
    }

    if (status) {
      filtered = filtered.filter((lot) => lot.status === status);
    }

    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter((lot) =>
        [lot.code, lot.financingPlan ?? '', lot.buyerId ?? ''].some((field) =>
          field.toLowerCase().includes(lower)
        )
      );
    }

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total: filtered.length, page, limit };
  }

  findOne(id: string): Lot {
    const lot = this.lots.find((item) => item.id === id);

    if (!lot) {
      throw new NotFoundException(`El lote con id ${id} no existe`);
    }

    return lot;
  }

  create(payload: CreateLotDto): Lot {
    const newLot: Lot = {
      ...payload,
      id: randomUUID(),
      createdAt: new Date()
    };

    this.lots.push(newLot);
    return newLot;
  }

  update(id: string, payload: UpdateLotDto): Lot {
    const lot = this.findOne(id);
    const updated: Lot = {
      ...lot,
      ...payload
    };

    this.lots = this.lots.map((item) => (item.id === id ? updated : item));

    return updated;
  }
}
