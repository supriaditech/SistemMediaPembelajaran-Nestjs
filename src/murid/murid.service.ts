import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { buildResponse } from 'helper/buildResponse';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as sharp from 'sharp';
import { UpdateMuridDto } from './Dto/UpdateMurid.dto';
import { CreateTesGayaBelajarDto } from './Dto/CreateJawabanMurid.dto';

@Injectable()
export class MuridService {
  constructor(private prisma: PrismaService) {}

  async createMurid(data: any, file: Express.Multer.File) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: Number(data.userId) },
      });

      if (!user || user.role !== 'MURID') {
        return buildResponse(
          null,
          'User dengan userId ini tidak ditemukan atau bukan Murid.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const uploadsPath = join(process.cwd(), 'public', 'uploads');
      if (!existsSync(uploadsPath)) {
        mkdirSync(uploadsPath, { recursive: true });
      }

      let fileName: string | null = null;
      if (file) {
        fileName = `${user.id}-${Date.now()}-${file.originalname}`;
        const filePath = join(uploadsPath, fileName);
        await sharp(file.buffer)
          .resize({ width: 800 })
          .jpeg({ quality: 80 })
          .toFile(filePath);

        fileName = `public/uploads/${fileName}`;
      }

      const createMurid = await this.prisma.murid.create({
        data: {
          photo: fileName,
          user: {
            connect: { id: user.id },
          },
        },
      });

      return buildResponse(
        createMurid,
        'Data Murid berhasil dibuat',
        HttpStatus.OK,
      );
    } catch (error) {
      return buildResponse(
        null,
        `Data Murid gagal dibuat: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllMurids() {
    const getAllMurids = await this.prisma.murid.findMany({
      include: {
        user: true,
      },
    });

    if (getAllMurids.length > 0) {
      return buildResponse(
        getAllMurids,
        'Data murid berhasil dimuat',
        HttpStatus.OK,
      );
    } else {
      return buildResponse(
        null,
        'Data murid tidak ditemukan',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getMuridById(muridId: number) {
    const murid = await this.prisma.murid.findUnique({
      where: { id: muridId },
      include: {
        user: true,
      },
    });

    if (murid) {
      return buildResponse(murid, 'Data Murid berhasil diambil', HttpStatus.OK);
    } else {
      return buildResponse(null, 'Murid tidak ditemukan', HttpStatus.NOT_FOUND);
    }
  }

  async updateMurid(data: UpdateMuridDto, file: Express.Multer.File) {
    try {
      const muridId = Number(data.muridId);

      if (isNaN(muridId)) {
        return buildResponse(
          null,
          'Murid ID tidak valid',
          HttpStatus.BAD_REQUEST,
        );
      }

      const existingMurid = await this.prisma.murid.findUnique({
        where: { id: muridId },
      });

      if (!existingMurid) {
        return buildResponse(
          null,
          'Murid tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );
      }

      const uploadsPath = join(process.cwd(), 'public', 'uploads');
      if (!existsSync(uploadsPath)) {
        mkdirSync(uploadsPath, { recursive: true });
      }

      let fileName: string | null = null;
      if (file) {
        fileName = `${existingMurid.id}-${Date.now()}-${file.originalname}`;
        const filePath = join(uploadsPath, fileName);
        await sharp(file.buffer)
          .resize({ width: 800 })
          .jpeg({ quality: 80 })
          .toFile(filePath);

        fileName = `public/uploads/${fileName}`;
      }

      const updatedMurid = await this.prisma.murid.update({
        where: { id: muridId },
        data: {
          photo: fileName,
        },
      });

      return buildResponse(
        updatedMurid,
        'Data Murid berhasil diupdate',
        HttpStatus.OK,
      );
    } catch (error) {
      return buildResponse(
        null,
        `Error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteMurid(muridId: number) {
    try {
      const murid = await this.prisma.murid.findUnique({
        where: { id: muridId },
      });

      if (!murid) {
        return buildResponse(
          null,
          'Murid tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.murid.delete({
        where: { id: muridId },
      });

      return buildResponse(null, 'Data Murid berhasil dihapus', HttpStatus.OK);
    } catch (error) {
      return buildResponse(
        null,
        `Error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async submitTesGayaBelajar(data: CreateTesGayaBelajarDto) {
    try {
      const { muridId, jawaban } = data;

      // Validasi murid
      const murid = await this.prisma.murid.findUnique({
        where: { id: muridId },
      });

      if (!murid) {
        return buildResponse(
          null,
          'Murid tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );
      }

      // Hitung gaya belajar berdasarkan jawaban
      const counts = {
        Visual: 0,
        Auditori: 0,
        Kinestetik: 0,
      };

      jawaban.forEach((j) => {
        if (counts.hasOwnProperty(j.jawaban)) {
          counts[j.jawaban] += 1;
        }
      });

      const maxGayaBelajar = Object.keys(counts).reduce((a, b) =>
        counts[a] > counts[b] ? a : b,
      );

      // Update gaya belajar murid
      await this.prisma.murid.update({
        where: { id: muridId },
        data: { gayaBelajar: maxGayaBelajar },
      });

      // Kembalikan respons dengan gaya belajar
      return buildResponse(
        { gayaBelajar: maxGayaBelajar },
        `Jawaban tes gaya belajar berhasil disubmit dan gaya belajar diperbarui menjadi ${maxGayaBelajar}`,
        HttpStatus.OK,
      );
    } catch (error) {
      return buildResponse(
        null,
        `Error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
