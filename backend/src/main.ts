import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    process.env.LOCAL_BE_URL || 'http://localhost:3000',
    process.env.SERVER_BE_URL || 'https://taskman-krpexpd5u-kins-projects-a2930a32.vercel.app',
  ];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
}

bootstrap().catch((err) => console.error(err));
