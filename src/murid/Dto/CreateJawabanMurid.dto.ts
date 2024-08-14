import { IsArray, IsInt } from 'class-validator';

export class CreateTesGayaBelajarDto {
  @IsInt()
  muridId: number;

  @IsArray()
  jawaban: {
    pertanyaan: number;
    jawaban: 'Visual' | 'Auditori' | 'Kinestetik';
  }[];
}
