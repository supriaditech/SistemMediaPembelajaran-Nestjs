import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MateriModule } from './materi/materi.module';
import { GuruModule } from './guru/guru.module';
import { SoalModule } from './soal/soal.module';
import { MuridModule } from './murid/murid.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, MateriModule, GuruModule, SoalModule, MuridModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
