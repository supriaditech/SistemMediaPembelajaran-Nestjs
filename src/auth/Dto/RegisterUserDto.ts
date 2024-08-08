import { Role } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
