import { Module } from '@nestjs/common';
import { GuruService } from './guru.service';
import { GuruController } from './guru.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [GuruService],
  controllers: [GuruController],
  imports: [PrismaModule],
})
export class GuruModule {}
