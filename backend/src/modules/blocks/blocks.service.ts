import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { PaginatedResponse } from '../../common/dto/base-response.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Block } from './entities/block.entity';

@Injectable()
export class BlocksService {
  private blocks: Block[] = [
    {
      id: 'block-a',
      projectId: 'proj-luna-azul',
      code: 'A',
      description: 'Manzana inicial con 20 lotes residenciales',
      lotCount: 20,
      createdAt: new Date('2024-02-12T10:00:00Z')
    }
  ];

  findAll(query: PaginationQueryDto & { projectId?: string }): PaginatedResponse<Block> {
    const { page = 1, limit = 25, search, projectId } = query;
    let filtered = this.blocks;

    if (projectId) {
      filtered = filtered.filter((block) => block.projectId === projectId);
    }

    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter((block) =>
        [block.code, block.description ?? ''].some((field) => field.toLowerCase().includes(lower))
      );
    }

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total: filtered.length, page, limit };
  }

  findOne(id: string): Block {
    const block = this.blocks.find((item) => item.id === id);

    if (!block) {
      throw new NotFoundException(`La manzana con id ${id} no existe`);
    }

    return block;
  }

  create(payload: CreateBlockDto): Block {
    const newBlock: Block = {
      ...payload,
      id: randomUUID(),
      createdAt: new Date()
    };

    this.blocks.push(newBlock);
    return newBlock;
  }

  update(id: string, payload: UpdateBlockDto): Block {
    const block = this.findOne(id);
    const updated: Block = { ...block, ...payload };

    this.blocks = this.blocks.map((item) => (item.id === id ? updated : item));

    return updated;
  }
}
