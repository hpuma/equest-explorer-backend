import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsApiService } from './api/news-api.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [NewsController],
  providers: [NewsService, NewsApiService],
})
export class NewsModule {}
