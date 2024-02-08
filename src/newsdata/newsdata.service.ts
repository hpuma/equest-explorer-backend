import { Injectable } from '@nestjs/common';
import { NewsQueryDto } from './dto/news-query.dto';
import { NewsDataApiService } from './api/newsdata-api.service';
import { GetQueryDto } from './api/dto/get-query.dto';

@Injectable()
export class NewsDataService {
  constructor(private newsDataApiService: NewsDataApiService) {}
  async getNews({ ticker }: NewsQueryDto) {
    const params: GetQueryDto = {
      q: ticker,
    };
    return await this.newsDataApiService.get(params);
  }
}
