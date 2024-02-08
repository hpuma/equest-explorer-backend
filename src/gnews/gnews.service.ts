import { Injectable } from '@nestjs/common';
import { NewsQueryDto } from './dto/news-query.dto';
import { GetQueryDto } from './api/dto/get-query.dto';
import { GNewsApiService } from './api/gnews-api.service';
@Injectable()
export class GNewsService {
  constructor(private gNewsApiService: GNewsApiService) {}
  async getNews({ ticker }: NewsQueryDto) {
    const params: GetQueryDto = {
      q: ticker,
    };
    return await this.gNewsApiService.get(params);
  }
}
