import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TheNewsService } from './thenews.service';
import { TheNewsController } from './thenews.controller';
import { TheNewsServiceApi } from './api/thenews-api.service';
import { GlobalModule } from '@global/global.module';
@Module({
  imports: [
    GlobalModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        baseURL: config.get('THENEWS_BASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TheNewsController],
  providers: [TheNewsService, TheNewsServiceApi, ConfigService],
})
export class TheNewsModule {}
