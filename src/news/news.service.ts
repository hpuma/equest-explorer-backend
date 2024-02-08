import { Injectable } from '@nestjs/common';
import { NewsQueryDto } from './dto/news-query.dto';
import { GetEverythingQueryDto } from './api/dto/get-query.dto';
import { NewsApiService } from './api/news-api.service';

@Injectable()
export class NewsService {
  constructor(private newsApiService: NewsApiService) {}

  async getNews(query: NewsQueryDto) {
    const params: GetEverythingQueryDto = {
      q: query.ticker,
      searchIn: query.contentSource,
      source: query.newsSource,
      from: query.startDate,
      to: query.endDate,
      sortBy: query.sortBy,
      language: query.language,
    };
    return await this.newsApiService.get(params);
  }
}
