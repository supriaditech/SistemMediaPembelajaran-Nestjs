import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { buildResponse } from 'helper/buildResponse';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './Dto/UpdateUserDto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers() {
    const user = await this.prisma.user.findMany({
      include: {
        Admin: true,
        Guru: true,
        Murid: true,
      },
    });

    if (user) {
      return buildResponse(user, 'Data user berhasil di muat', HttpStatus.OK);
    } else {
      throw new HttpException(
        'Data user gagal di muat',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async updateUser(data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: data.id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return updatedUser;
  }

  // Fungsi untuk menghapus pengguna
  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }
}
