import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthGuard, AuthGuardService } from 'auth';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(express.json({ limit: '10mb' }));
  const config = new DocumentBuilder()
    .setTitle('EQUEST Backend API')
    .setDescription(
      'Equest endpoint documentation for integrations: alphav, marketaux, news',
    )
    .setVersion('0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const authGaurdService = app.get(AuthGuardService);
  const authGaurd = new AuthGuard(authGaurdService);

  // Register the guard globally
  app.useGlobalGuards(authGaurd);

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({ origin: true, credentials: true });
  await app.listen(3001);
}
bootstrap();
