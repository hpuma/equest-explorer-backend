import { Injectable } from '@nestjs/common';
import { GetQueryDto } from './api/dto';
import { BingApiService } from './api/bing-api.service';
import { NewsQueryDto } from './dto';

@Injectable()
export class BingService {
  constructor(private bingApiService: BingApiService) {}

  async getNews(query: NewsQueryDto) {
    const params: GetQueryDto = {
      q: query.ticker,
      freshness: 'day',
    };

    return await this.bingApiService.get(params);
  }
}
