import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MuridService } from './murid.service';
import { CreateTesGayaBelajarDto } from './Dto/CreateJawabanMurid.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('murid')
export class MuridController {
  constructor(private readonly muridService: MuridService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('photo'))
  async createMurid(
    @Body() data: { userId: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.muridService.createMurid(data, file);
  }

  @UseGuards(AuthGuard)
  @Post('getAll')
  async getAllMurids() {
    return this.muridService.getAllMurids();
  }

  @UseGuards(AuthGuard)
  @Post('getById')
  async getMuridById(@Body('id') id: number) {
    return this.muridService.getMuridById(id);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  @UseInterceptors(FileInterceptor('photo'))
  async updateMurid(
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.muridService.updateMurid(data, file);
  }

  @UseGuards(AuthGuard)
  @Post('delete')
  async deleteMurid(@Body('id') id: number) {
    return this.muridService.deleteMurid(id);
  }

  @UseGuards(AuthGuard)
  @Post('submit-tes-gaya-belajar')
  async submitTesGayaBelajar(
    @Body() createTesGayaBelajarDto: CreateTesGayaBelajarDto,
  ) {
    return this.muridService.submitTesGayaBelajar(createTesGayaBelajarDto);
  }
}
