import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../../common/dto/pagination.dto';
import { FinancingPlanType } from '../entities/financing-plan.entity';

export class ListPlansQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsEnum(FinancingPlanType)
  planType?: FinancingPlanType;
}
