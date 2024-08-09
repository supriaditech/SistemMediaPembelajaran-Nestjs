import { Role } from '@prisma/client';
import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
