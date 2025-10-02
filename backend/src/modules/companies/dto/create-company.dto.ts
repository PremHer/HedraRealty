import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @Length(11, 11)
  ruc!: string;

  @IsString()
  @IsNotEmpty()
  legalAddress!: string;

  @IsString()
  @IsNotEmpty()
  generalManagerId!: string;
}
