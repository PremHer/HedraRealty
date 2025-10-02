import { IsArray, IsDateString, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  companyId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsIn(['lotizacion'])
  type!: 'lotizacion';

  @IsNumber()
  @Min(0)
  totalAreaM2!: number;

  @IsArray()
  services!: string[];

  @IsArray()
  amenities!: string[];

  @IsArray()
  documentation!: string[];

  @IsArray()
  deliveryWorks!: string[];

  @IsNumber()
  @Min(0)
  @Max(100)
  salesProgress!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  constructionProgress!: number;

  @IsString()
  @IsNotEmpty()
  managerId!: string;

  @IsOptional()
  @IsDateString()
  launchDate?: string;
}
