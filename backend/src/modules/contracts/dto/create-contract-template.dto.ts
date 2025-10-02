import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateContractTemplateDto {
  @IsString()
  @IsNotEmpty()
  projectId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  body!: string;

  @IsArray()
  placeholders!: string[];
}
