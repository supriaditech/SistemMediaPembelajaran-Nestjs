import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Aktifkan transformasi otomatis
    }),
  );

  const uploadsPath = join(process.cwd(), 'public', 'uploads');

  app.use('/public/uploads', express.static(uploadsPath));
  await app.listen(3002);
}
bootstrap();
