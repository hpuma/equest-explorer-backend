import { Injectable } from '@nestjs/common';
import { NewsApiService } from './api/news-api.service';
import { EverythingDto } from './dto/everything.dto';
import { GetEverythingDto } from './api/dto/get-everything.dto';

@Injectable()
export class NewsService {
  constructor(private newsApiService: NewsApiService) {}

  async getEverything(query: EverythingDto) {
    const params: GetEverythingDto = {
      q: query.ticker,
      searchIn: query.contentSource,
      source: query.newsSource,
      from: query.startDate,
      to: query.endDate,
      sortBy: query.sortBy,
      language: query.language,
    };

    const data = await this.newsApiService.getEverything(params);

    return data;
  }
}
