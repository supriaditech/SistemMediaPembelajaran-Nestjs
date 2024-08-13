import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { SoalService } from './soal.service';
import { CreateSoalDto } from './Dto/CreateSoalDto';
import { CreateJawabanDto } from './Dto/CreateJawabanDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SubmitMultipleJawabanDto } from './Dto/SubmitMultipleJawabanDto';

@Controller('soal')
export class SoalController {
  constructor(private readonly soalService: SoalService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createSoal(@Request() req, @Body() createSoalDto: CreateSoalDto) {
    return this.soalService.createSoal(req.user.id, createSoalDto);
  }

  @UseGuards(AuthGuard)
  @Post('materi')
  async getSoalByMateri(@Body('materiId') materiId: number) {
    return this.soalService.getSoalByMateri(materiId);
  }

  @UseGuards(AuthGuard)
  @Post('jawab')
  async submitJawaban(
    @Request() req,
    @Body() createJawabanDto: CreateJawabanDto,
  ) {
    return this.soalService.submitJawaban(req.user.id, createJawabanDto);
  }

  @UseGuards(AuthGuard)
  @Post('submit-many')
  async submitMultipleJawaban(
    @Request() req,
    @Body() submitMultipleJawabanDto: SubmitMultipleJawabanDto,
  ) {
    return this.soalService.submitMultipleJawaban(
      req.user.id,
      submitMultipleJawabanDto,
    );
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async updateSoal(
    @Request() req,
    @Body() updateSoalDto: { soalId: number; data: CreateSoalDto },
  ) {
    const { soalId, data } = updateSoalDto;
    return this.soalService.updateSoal(req.user.id, soalId, data);
  }

  @UseGuards(AuthGuard)
  @Post('delete')
  async deleteSoal(@Request() req, @Body() deleteSoalDto: { soalId: number }) {
    const { soalId } = deleteSoalDto;

    return this.soalService.deleteSoal(req.user.id, soalId);
  }
}
