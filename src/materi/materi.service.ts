import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMateriDto } from './Dto/CreateMateriDto';
import { buildResponse } from 'helper/buildResponse';
import { getCurrentLocalTime } from 'helper/date-helper';
import { UpdateMateriDto } from './Dto/UpdateMateriDto';

@Injectable()
export class MateriService {
  constructor(private prisma: PrismaService) {}

  async createMateri(userId: number, data: CreateMateriDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { Guru: true },
    });

    if (!user || user.role !== 'GURU') {
      throw new HttpException(
        buildResponse(null, 'Unauthorized', HttpStatus.FORBIDDEN),
        HttpStatus.FORBIDDEN,
      );
    }

    if (!user.Guru) {
      throw new HttpException(
        buildResponse(null, 'Guru not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }

    const currentDateTime = getCurrentLocalTime();
    const materi = await this.prisma.materi.create({
      data: {
        title: data.title,
        videoUrl: data.videoUrl,
        content: data.content,
        guruId: user.Guru.id,
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
      },
    });

    if (materi) {
      return buildResponse(
        materi,
        'Materi created successfully',
        HttpStatus.OK,
      );
    } else {
      return buildResponse(
        null,
        'Failed to create materi',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllMateri() {
    const materi = await this.prisma.materi.findMany();

    if (materi) {
      return buildResponse(
        materi,
        'Materi retrieved successfully',
        HttpStatus.OK,
      );
    } else {
      return buildResponse(null, 'No materi found', HttpStatus.NOT_FOUND);
    }
  }

  async updateMateri(userId: number, data: UpdateMateriDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { Guru: true },
    });

    if (!user || user.role !== 'GURU') {
      throw new HttpException(
        buildResponse(null, 'Unauthorized', HttpStatus.FORBIDDEN),
        HttpStatus.FORBIDDEN,
      );
    }

    const materi = await this.prisma.materi.findUnique({
      where: { id: data.id },
    });

    if (!materi) {
      throw new HttpException(
        buildResponse(null, 'Materi not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedMateri = await this.prisma.materi.update({
      where: { id: data.id },
      data: {
        ...data,
        updatedAt: getCurrentLocalTime(),
      },
    });

    if (updatedMateri) {
      return buildResponse(
        updatedMateri,
        'Materi updated successfully',
        HttpStatus.OK,
      );
    } else {
      return buildResponse(
        null,
        'Failed to update materi',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteMateri(userId: number, materiId: any) {
    const id = materiId.id;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { Guru: true },
    });

    if (!user || user.role !== 'GURU') {
      throw new HttpException(
        buildResponse(null, 'Unauthorized', HttpStatus.FORBIDDEN),
        HttpStatus.FORBIDDEN,
      );
    }

    const materi = await this.prisma.materi.findUnique({
      where: { id: id },
    });

    if (!materi) {
      throw new HttpException(
        buildResponse(null, 'Materi not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }

    const deletedMateri = await this.prisma.materi.delete({
      where: { id: id },
    });

    if (deletedMateri) {
      return buildResponse(
        deletedMateri,
        'Materi deleted successfully',
        HttpStatus.OK,
      );
    } else {
      return buildResponse(
        null,
        'Failed to delete materi',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
