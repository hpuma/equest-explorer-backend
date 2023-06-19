import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthGaurd, AuthGaurdService } from 'auth';

import 'module-alias/register';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('EQUEST Backend API')
    .setDescription(
      'Equest endpoint documentation for integrations: alphav, marketaux, news',
    )
    .setVersion('0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const authGaurdService = app.get(AuthGaurdService);
  const authGaurd = new AuthGaurd(authGaurdService);

  // Register the guard globally
  app.useGlobalGuards(authGaurd);

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3001);
}
bootstrap();
