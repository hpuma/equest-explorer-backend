import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { NewsService } from './news.service';
import { NewsApiService } from './api/news-api.service';
import { NewsController } from './news.controller';
import { GlobalModule } from '@global/global.module';
@Module({
  imports: [
    GlobalModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        baseURL: config.get('NEWS_BASE_URL'),
        headers: {
          'X-Api-Key': config.get('NEWS_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [NewsController],
  providers: [NewsService, NewsApiService],
})
export class NewsModule {}
