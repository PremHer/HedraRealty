import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { CashflowEntryType } from '../entities/cashflow-entry.entity';

export class CreateCashflowEntryDto {
  @IsString()
  @IsNotEmpty()
  projectId!: string;

  @IsDateString()
  date!: string;

  @IsEnum(CashflowEntryType)
  type!: CashflowEntryType;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsString()
  reference?: string;
}
