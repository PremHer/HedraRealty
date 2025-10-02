import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { CreateLotDto } from './dto/create-lot.dto';
import { LotsQueryDto } from './dto/lots-query.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { LotEntity } from './entities/lot.entity';

@Injectable()
export class LotsService {
  constructor(
    @InjectRepository(LotEntity)
    private readonly lotsRepository: Repository<LotEntity>
  ) {}

  async findAll(query: LotsQueryDto): Promise<PaginatedResponse<LotEntity>> {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(Number(query.limit) || 25, 100));

    const qb = this.lotsRepository.createQueryBuilder('lot');

    if (query.projectId) {
      qb.where('lot.project_id = :projectId', { projectId: query.projectId });
    }

    if (query.blockId) {
      qb.andWhere('lot.block_id = :blockId', { blockId: query.blockId });
    }

    if (query.status) {
      qb.andWhere('lot.status = :status', { status: query.status });
    }

    if (query.search) {
      const searchTerm = `%${query.search.trim()}%`;
      qb.andWhere(
        'lot.code ILIKE :search OR lot.buyer_id ILIKE :search OR lot.financing_plan_id::text ILIKE :search',
        { search: searchTerm }
      );
    }

    const [data, total] = await qb
      .orderBy('lot.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<LotEntity> {
    const lot = await this.lotsRepository.findOne({ where: { id } });

    if (!lot) {
      throw new NotFoundException(`El lote con id ${id} no existe`);
    }

    return lot;
  }

  async create(payload: CreateLotDto): Promise<LotEntity> {
    const lot = this.lotsRepository.create({
      ...payload,
      reservationDate: payload.reservationDate ? new Date(payload.reservationDate) : undefined,
      saleDate: payload.saleDate ? new Date(payload.saleDate) : undefined
    });

    return this.lotsRepository.save(lot);
  }

  async update(id: string, payload: UpdateLotDto): Promise<LotEntity> {
    const updatePayload: Partial<LotEntity> = {};
    const { reservationDate, saleDate, ...rest } = payload;

    Object.assign(updatePayload, rest);

    if (reservationDate) {
      updatePayload.reservationDate = new Date(reservationDate);
    }

    if (saleDate) {
      updatePayload.saleDate = new Date(saleDate);
    }

    const lot = await this.lotsRepository.preload({ id, ...updatePayload });

    if (!lot) {
      throw new NotFoundException(`El lote con id ${id} no existe`);
    }

    return this.lotsRepository.save(lot);
  }
}
