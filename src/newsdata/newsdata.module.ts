import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { NewsDataService } from './newsdata.service';
import { NewsDataController } from './newsdata.controller';
import { NewsDataApiService } from './api/newsdata-api.service';
import { GlobalModule } from '@global/global.module';

@Module({
  imports: [
    GlobalModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        baseURL: config.get('NEWSDATA_BASE_URL'),
        headers: {
          'X-ACCESS-KEY': config.get('NEWSDATA_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [NewsDataController],
  providers: [NewsDataService, NewsDataApiService],
})
export class NewsDataModule {}
