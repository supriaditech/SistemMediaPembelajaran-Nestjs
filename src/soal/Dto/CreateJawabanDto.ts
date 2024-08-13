import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateJawabanDto {
  @IsInt({ message: 'soalId harus berupa angka' })
  @Min(1, { message: 'soalId harus lebih besar dari 0' })
  soalId: number;

  @IsString({ message: 'Jawaban harus berupa string' })
  @IsNotEmpty({ message: 'Jawaban tidak boleh kosong' })
  jawaban: string;
}
