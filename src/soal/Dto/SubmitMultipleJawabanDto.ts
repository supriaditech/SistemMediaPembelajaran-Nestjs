import { Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { CreateJawabanDto } from './CreateJawabanDto';

export class SubmitMultipleJawabanDto {
  @IsInt()
  materiId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJawabanDto)
  jawabanList: CreateJawabanDto[];
}
