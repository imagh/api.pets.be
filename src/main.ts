import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true
  }));
  await app.listen(3000);
}
bootstrap();
