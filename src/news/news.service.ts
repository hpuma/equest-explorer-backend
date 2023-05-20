import { Injectable } from '@nestjs/common';
import { NewsApiService } from './api/news-api.service';
import { EverythingQueryDto } from './dto';
import { GetEverythingQueryDto } from './api/dto';

@Injectable()
export class NewsService {
  constructor(private newsApiService: NewsApiService) {}

  async getEverything(query: EverythingQueryDto) {
    const params: GetEverythingQueryDto = {
      q: query.ticker,
      searchIn: query.contentSource,
      source: query.newsSource,
      from: query.startDate,
      to: query.endDate,
      sortBy: query.sortBy,
      language: query.language,
    };

    return await this.newsApiService.getEverything(params);
  }
}
