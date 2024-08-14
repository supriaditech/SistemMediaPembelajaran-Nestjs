import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateMuridDto {
  @IsInt()
  muridId: number;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  gayaBelajar?: string;
}
