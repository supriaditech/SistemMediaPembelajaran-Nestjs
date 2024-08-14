import { Module } from '@nestjs/common';
import { MuridService } from './murid.service';
import { MuridController } from './murid.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [MuridService],
  controllers: [MuridController],
  imports: [PrismaModule],
})
export class MuridModule {}
