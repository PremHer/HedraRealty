import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../../common/dto/pagination.dto';
import { LotStatus } from '../entities/lot.entity';

export class LotsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsString()
  blockId?: string;

  @IsOptional()
  @IsEnum(LotStatus)
  status?: LotStatus;
}
