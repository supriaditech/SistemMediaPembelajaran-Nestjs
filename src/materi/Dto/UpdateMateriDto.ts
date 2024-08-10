import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMateriDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
