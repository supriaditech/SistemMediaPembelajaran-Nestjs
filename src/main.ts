import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Update with your front-end URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Serve static files
  const uploadsPath = join(process.cwd(), 'public', 'uploads');
  app.use('/public/uploads', express.static(uploadsPath));

  // Start the server
  const port = process.env.PORT || 3002;
  await app.listen(port);
}

bootstrap();
