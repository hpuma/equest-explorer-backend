import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GNewsService } from './gnews.service';
import { GNewsController } from './gnews.controller';
import { GNewsApiService } from './api/gnews-api.service';
import { GlobalModule } from '@global/global.module';
@Module({
  imports: [
    GlobalModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        baseURL: config.get('GNEWS_BASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [GNewsController],
  providers: [GNewsService, GNewsApiService, ConfigService],
})
export class GNewsModule {}
