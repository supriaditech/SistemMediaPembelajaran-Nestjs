import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMateriDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
