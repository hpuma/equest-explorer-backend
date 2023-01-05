import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsApiService } from './api/news-api.service';

@Module({
  imports: [HttpModule],
  controllers: [NewsController],
  providers: [NewsService, NewsApiService],
})
export class NewsModule {}
