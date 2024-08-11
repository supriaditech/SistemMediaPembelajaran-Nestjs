import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateGuruDto } from './dto/UpdateGuruDto';
import { buildResponse } from 'helper/buildResponse';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as sharp from 'sharp';

@Injectable()
export class GuruService {
  constructor(private prisma: PrismaService) {}

  async createGuru(data: any, file: Express.Multer.File) {
    try {
      // Cek apakah user dengan userId tersebut sudah ada
      const user = await this.prisma.user.findUnique({
        where: { userId: data.userId }, // Perbaikan: menggunakan userId, bukan id
      });

      if (!user || user.role !== 'GURU') {
        return buildResponse(
          null,
          'User dengan userId ini tidak ditemukan atau bukan Guru.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const uploadsPath = join(process.cwd(), 'public', 'uploads');
      if (!existsSync(uploadsPath)) {
        mkdirSync(uploadsPath, { recursive: true });
      }

      // Simpan file dan update data dengan nama file
      let fileName: string | null = null;
      if (file) {
        fileName = `${user.id}-${Date.now()}-${file.originalname}`;
        const filePath = join(uploadsPath, fileName);
        await sharp(file.buffer)
          .resize({ width: 800 })
          .jpeg({ quality: 80 })
          .toFile(filePath);

        // Setel path dengan prefix "public/uploads/converted" untuk disimpan di database
        fileName = `public/uploads/${fileName}`;
      }
      // Buat Guru baru
      const createGuru = await this.prisma.guru.create({
        data: {
          photo: fileName, // Hanya nama file disimpan
          // guruId: user.id, // Menghubungkan dengan user.id sebagai guruId
          user: {
            connect: { id: user.id }, // Menghubungkan dengan user yang sudah ada
          },
        },
      });

      return buildResponse(
        createGuru,
        'Data Guru berhasil dibuat',
        HttpStatus.OK,
      );
    } catch (error) {
      return buildResponse(
        null,
        `Data Guru gagal dibuat: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getAllGurus() {
    const getAllGurus = await this.prisma.guru.findMany({
      include: {
        user: true,
      },
    });

    if (getAllGurus.length > 0) {
      return buildResponse(
        getAllGurus,
        'Data guru berhasil dimuat',
        HttpStatus.OK,
      );
    } else {
      return buildResponse(
        null,
        'Data guru tidak ditemukan',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getGuruById(guruId: number) {
    const guru = await this.prisma.guru.findUnique({
      where: { id: guruId },
      include: {
        user: true,
      },
    });

    if (guru) {
      return buildResponse(guru, 'Data Guru berhasil diambil', HttpStatus.OK);
    } else {
      return buildResponse(null, 'Guru tidak ditemukan', HttpStatus.NOT_FOUND);
    }
  }

  async updateGuru(data: UpdateGuruDto, file: Express.Multer.File) {
    console.log('Received Data:', data);

    try {
      const guruId = Number(data.guruId); // Menggunakan guruId sebagai referensi ke User.id
      console.log('Parsed guruId:', guruId);

      if (isNaN(guruId)) {
        return buildResponse(
          null,
          'Guru ID tidak valid',
          HttpStatus.BAD_REQUEST,
        );
      }

      const existingGuru = await this.prisma.guru.findUnique({
        where: { guruId: guruId }, // Menggunakan guruId untuk menemukan Guru
      });

      if (!existingGuru) {
        return buildResponse(
          null,
          'Guru tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );
      }

      const uploadsPath = join(process.cwd(), 'public', 'uploads');
      if (!existsSync(uploadsPath)) {
        mkdirSync(uploadsPath, { recursive: true });
      }

      let fileName: string | null = null;
      if (file) {
        fileName = `${existingGuru.id}-${Date.now()}-${file.originalname}`;
        const filePath = join(uploadsPath, fileName);
        await sharp(file.buffer)
          .resize({ width: 800 })
          .jpeg({ quality: 80 })
          .toFile(filePath);

        fileName = `public/uploads/${fileName}`;
      }

      const updatedGuru = await this.prisma.guru.update({
        where: { guruId: guruId }, // Menggunakan guruId untuk update Guru
        data: {
          photo: fileName,
        },
      });

      return buildResponse(
        updatedGuru,
        'Data Guru berhasil diupdate',
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

  async deleteGuru(guruId: number) {
    try {
      const guru = await this.prisma.guru.findUnique({
        where: { id: guruId },
      });

      if (!guru) {
        return buildResponse(
          null,
          'Guru tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.guru.delete({
        where: { id: guruId },
      });

      return buildResponse(null, 'Data Guru berhasil dihapus', HttpStatus.OK);
    } catch (error) {
      return buildResponse(
        null,
        `Error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
