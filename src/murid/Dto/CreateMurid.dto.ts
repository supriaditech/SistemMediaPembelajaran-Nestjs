import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateMuridDto {
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  gayaBelajar?: string;
}
