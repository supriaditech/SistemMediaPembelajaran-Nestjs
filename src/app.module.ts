import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MateriModule } from './materi/materi.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, MateriModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
