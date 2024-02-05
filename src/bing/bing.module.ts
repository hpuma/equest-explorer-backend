import { Module } from '@nestjs/common';
import { BingService } from './bing.service';
import { BingController } from './bing.controller';
import { BingApiService } from './api/bing-api.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalModule } from '@global/global.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    GlobalModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService
          .get('BING_API_KEY')
          .concat(`?apikey=${configService.get('BING_API_KEY')}`),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BingController],
  providers: [BingService, BingApiService],
})
export class BingModule {}
