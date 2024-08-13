import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSoalDto } from './Dto/CreateSoalDto';
import { buildResponse } from 'helper/buildResponse';
// import { getCurrentLocalTime } from 'helper/date-helper';
import { CreateJawabanDto } from './Dto/CreateJawabanDto';
import { SubmitMultipleJawabanDto } from './Dto/SubmitMultipleJawabanDto';

@Injectable()
export class SoalService {
  constructor(private prisma: PrismaService) {}

  async createSoal(userId: number, data: CreateSoalDto) {
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

    // const currentDateTime = getCurrentLocalTime();
    const soal = await this.prisma.soal.create({
      data: {
        question: data.question,
        answer: data.answer,
        guruId: user.Guru.id,
        materiId: data.materiId,
        options: {
          create: data.options,
        },
      },
      include: { options: true },
    });

    if (soal) {
      return buildResponse(soal, 'Soal created successfully', HttpStatus.OK);
    } else {
      return buildResponse(
        null,
        'Failed to create soal',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getSoalByMateri(materiId: number) {
    const soals = await this.prisma.soal.findMany({
      where: { materiId: materiId },
      include: { options: true },
    });

    if (soals) {
      return buildResponse(
        soals,
        'Soals retrieved successfully',
        HttpStatus.OK,
      );
    } else {
      return buildResponse(null, 'No soals found', HttpStatus.NOT_FOUND);
    }
  }

  async submitJawaban(userId: number, data: CreateJawabanDto) {
    const murid = await this.prisma.murid.findUnique({
      where: { muridId: userId },
    });

    if (!murid) {
      throw new HttpException(
        buildResponse(null, 'Murid not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }

    const soal = await this.prisma.soal.findUnique({
      where: { id: data.soalId },
    });

    if (!soal) {
      throw new HttpException(
        buildResponse(null, 'Soal not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }

    const jawaban = await this.prisma.jawaban.create({
      data: {
        soalId: data.soalId,
        muridId: murid.id,
        jawaban: data.jawaban,
      },
    });

    const isCorrect = jawaban.jawaban === soal.answer;

    return buildResponse(
      { jawaban, isCorrect },
      'Jawaban submitted successfully',
      HttpStatus.OK,
    );
  }

  async submitMultipleJawaban(userId: number, data: SubmitMultipleJawabanDto) {
    const murid = await this.prisma.murid.findUnique({
      where: { muridId: userId },
    });

    if (!murid) {
      throw new HttpException(
        buildResponse(null, 'Murid not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }

    let correctAnswersCount = 0;
    const totalSoal = data.jawabanList.length;
    const results = [];

    for (const jawaban of data.jawabanList) {
      const soal = await this.prisma.soal.findUnique({
        where: { id: jawaban.soalId },
      });

      if (!soal) {
        throw new HttpException(
          buildResponse(
            null,
            `Soal with ID ${jawaban.soalId} not found`,
            HttpStatus.NOT_FOUND,
          ),
          HttpStatus.NOT_FOUND,
        );
      }

      const newJawaban = await this.prisma.jawaban.create({
        data: {
          soalId: jawaban.soalId,
          muridId: murid.id,
          jawaban: jawaban.jawaban,
        },
      });

      const isCorrect = newJawaban.jawaban === soal.answer;
      if (isCorrect) {
        correctAnswersCount++;
      }

      results.push({ jawaban: newJawaban, isCorrect });
    }

    const summary = {
      correct: correctAnswersCount,
      total: totalSoal,
    };

    return buildResponse(
      { results, summary },
      'All jawaban submitted successfully',
      HttpStatus.OK,
    );
  }

  async updateSoal(userId: number, soalId: number, data: CreateSoalDto) {
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

    const soal = await this.prisma.soal.findUnique({
      where: { id: soalId },
      include: { guru: true },
    });

    if (!soal) {
      throw new HttpException(
        buildResponse(null, 'Soal not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }

    if (soal.guru.id !== user.Guru.id) {
      throw new HttpException(
        buildResponse(null, 'Unauthorized', HttpStatus.FORBIDDEN),
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedSoal = await this.prisma.soal.update({
      where: { id: soalId },
      data: {
        question: data.question,
        answer: data.answer,
        options: {
          deleteMany: {}, // Hapus semua opsi lama
          create: data.options, // Tambahkan opsi baru
        },
      },
      include: { options: true },
    });

    return buildResponse(
      updatedSoal,
      'Soal updated successfully',
      HttpStatus.OK,
    );
  }

  async deleteSoal(userId: number, soalId: number) {
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

    const soal = await this.prisma.soal.findUnique({
      where: { id: soalId },
      include: { guru: true },
    });

    if (!soal) {
      throw new HttpException(
        buildResponse(null, 'Soal not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }

    if (soal.guru.id !== user.Guru.id) {
      throw new HttpException(
        buildResponse(null, 'Unauthorized', HttpStatus.FORBIDDEN),
        HttpStatus.FORBIDDEN,
      );
    }
    console.log(soalId);
    await this.prisma.soal.delete({
      where: { id: soalId },
    });

    return buildResponse(null, 'Soal deleted successfully', HttpStatus.OK);
  }
}
