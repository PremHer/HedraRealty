import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min
} from 'class-validator';

import { LotStatus } from '../entities/lot.entity';

export class CreateLotDto {
  @IsString()
  @IsNotEmpty()
  blockId!: string;

  @IsString()
  @IsNotEmpty()
  projectId!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsNumber()
  @Min(0)
  areaM2!: number;

  @IsNumber()
  @Min(0)
  pricePen!: number;

  @IsEnum(LotStatus)
  status!: LotStatus;

  @IsOptional()
  @IsString()
  financingPlan?: string;

  @IsOptional()
  @IsString()
  buyerId?: string;

  @IsOptional()
  @IsDateString()
  reservationDate?: string;

  @IsOptional()
  @IsDateString()
  saleDate?: string;
}
