import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGuruDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  photo?: string; // Hanya menyimpan nama file, jika ada
}
