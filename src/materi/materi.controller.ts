import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { MateriService } from './materi.service';
import { CreateMateriDto } from './dto/CreateMateriDto';
import { UpdateMateriDto } from './dto/UpdateMateriDto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('materi')
export class MateriController {
  constructor(private readonly materiService: MateriService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createMateri(@Body() data: CreateMateriDto, @Request() req) {
    return await this.materiService.createMateri(req.user.id, data);
  }

  @UseGuards(AuthGuard)
  @Post('get-all')
  async getAllMateri() {
    return await this.materiService.getAllMateri();
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async updateMateri(@Body() updateData: UpdateMateriDto, @Request() req) {
    return await this.materiService.updateMateri(req.user.id, updateData);
  }

  @UseGuards(AuthGuard)
  @Post('delete')
  async deleteMateri(@Body() materiId: number, @Request() req) {
    return await this.materiService.deleteMateri(req.user.id, materiId);
  }
}
