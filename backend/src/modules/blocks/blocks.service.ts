import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { CreateBlockDto } from './dto/create-block.dto';
import { BlocksQueryDto } from './dto/blocks-query.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { BlockEntity } from './entities/block.entity';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(BlockEntity)
    private readonly blocksRepository: Repository<BlockEntity>
  ) {}

  async findAll(query: BlocksQueryDto): Promise<PaginatedResponse<BlockEntity>> {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(Number(query.limit) || 25, 100));

    const qb = this.blocksRepository.createQueryBuilder('block');

    if (query.projectId) {
      qb.where('block.project_id = :projectId', { projectId: query.projectId });
    }

    if (query.search) {
      const searchTerm = `%${query.search.trim()}%`;
      const condition = '(block.code ILIKE :search OR block.description ILIKE :search)';
      qb.andWhere(condition, { search: searchTerm });
    }

    const [data, total] = await qb
      .orderBy('block.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<BlockEntity> {
    const block = await this.blocksRepository.findOne({ where: { id } });

    if (!block) {
      throw new NotFoundException(`La manzana con id ${id} no existe`);
    }

    return block;
  }

  async create(payload: CreateBlockDto): Promise<BlockEntity> {
    const block = this.blocksRepository.create(payload);
    return this.blocksRepository.save(block);
  }

  async update(id: string, payload: UpdateBlockDto): Promise<BlockEntity> {
    const block = await this.blocksRepository.preload({ id, ...payload });

    if (!block) {
      throw new NotFoundException(`La manzana con id ${id} no existe`);
    }

    return this.blocksRepository.save(block);
  }
}
