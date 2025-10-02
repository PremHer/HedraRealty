import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../../common/dto/pagination.dto';
import { CashflowEntryType } from '../entities/cashflow-entry.entity';

export class ListCashflowQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsEnum(CashflowEntryType)
  type?: CashflowEntryType;
}
