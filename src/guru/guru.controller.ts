import {
  Body,
  Controller,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GuruService } from './guru.service';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('guru')
export class GuruController {
  constructor(private readonly guruService: GuruService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('photo'))
  async createGuru(
    @Body() data: { userId: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.guruService.createGuru(data, file);
  }
  @UseGuards(AuthGuard)
  @Post('get-all')
  async getAllGurus() {
    return await this.guruService.getAllGurus();
  }

  @UseGuards(AuthGuard)
  @Post('get-by-id')
  async getGuruById(@Body() data: { guruId: number }) {
    return await this.guruService.getGuruById(data.guruId);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  @UseInterceptors(FileInterceptor('photo'))
  async updateGuru(
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.guruService.updateGuru(data, file);
  }

  @UseGuards(AuthGuard)
  @Post('delete')
  async deleteGuru(@Body() data: { guruId: number }) {
    return await this.guruService.deleteGuru(data.guruId);
  }
}
