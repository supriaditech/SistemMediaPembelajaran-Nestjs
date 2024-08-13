import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsInt,
  Min,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class UpdateSoalDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsOptional({ message: 'Pertanyaan tidak boleh kosong' })
  question: string;

  @IsString()
  @IsOptional({ message: 'Jawaban tidak boleh kosong' })
  answer: string;

  @IsArray({ message: 'Pilihan harus berupa array' })
  @ArrayMinSize(4, { message: 'Harus ada setidaknya 4 pilihan jawaban' })
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options: CreateOptionDto[];

  @IsInt({ message: 'materiId harus berupa angka' })
  @Min(1, { message: 'materiId harus lebih besar dari 0' })
  materiId: number;
}
