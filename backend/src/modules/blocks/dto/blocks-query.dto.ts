import { IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../../common/dto/pagination.dto';

export class BlocksQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  projectId?: string;
}
