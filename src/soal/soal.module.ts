import { Module } from '@nestjs/common';
import { SoalService } from './soal.service';
import { SoalController } from './soal.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [SoalService],
  controllers: [SoalController],
  imports: [PrismaModule],
})
export class SoalModule {}
