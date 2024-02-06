import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { BingService } from './bing.service';
import { BingApiService } from './api/bing-api.service';
import { BingController } from './bing.controller';
import { GlobalModule } from '@global/global.module';
@Module({
  imports: [
    GlobalModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('BING_BASE_URL'),
        headers: {
          'Ocp-Apim-Subscription-Key': configService.get('BING_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BingController],
  providers: [BingService, BingApiService],
})
export class BingModule {}
