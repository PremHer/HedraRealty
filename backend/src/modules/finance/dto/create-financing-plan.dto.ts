import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min
} from 'class-validator';

import { FinancingPlanType } from '../entities/financing-plan.entity';

export class CreateFinancingPlanDto {
  @IsString()
  @IsNotEmpty()
  projectId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(FinancingPlanType)
  planType!: FinancingPlanType;

  @IsNumber()
  @Min(0)
  @Max(100)
  interestRateAnnual!: number;

  @IsInt()
  @Min(0)
  gracePeriodMonths!: number;

  @IsInt()
  @IsPositive()
  installments!: number;

  @IsBoolean()
  allowZeroDownPayment!: boolean;

  @IsNumber()
  @Min(0)
  @Max(100)
  penaltyRateMonthly!: number;
}
