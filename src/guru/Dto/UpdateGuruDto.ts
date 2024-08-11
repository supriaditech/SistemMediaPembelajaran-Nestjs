import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGuruDto {
  @IsOptional()
  @IsNumber()
  guruId: number;

  @IsOptional()
  @IsString()
  photo?: string; // Hanya menyimpan nama file, jika ada
}
