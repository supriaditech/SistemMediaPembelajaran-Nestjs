import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class CreateSoalDto {
  @IsString()
  @IsNotEmpty({ message: 'Pertanyaan tidak boleh kosong' })
  question: string;

  @IsString()
  @IsNotEmpty({ message: 'Jawaban tidak boleh kosong' })
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
