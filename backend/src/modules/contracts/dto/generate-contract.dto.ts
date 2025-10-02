import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateContractDto {
  @IsString()
  @IsNotEmpty()
  projectId!: string;

  @IsString()
  @IsNotEmpty()
  templateId!: string;

  @IsString()
  @IsNotEmpty()
  lotId!: string;

  @IsString()
  @IsNotEmpty()
  buyerId!: string;
}
