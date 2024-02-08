import { Injectable } from '@nestjs/common';
import { NewsQueryDto } from './dto/news-query.dto';
import { TheNewsServiceApi } from './api/thenews-api.service';
import { GetQueryDto } from './api/dto';

@Injectable()
export class TheNewsService {
  constructor(private readonly theNewsServiceApi: TheNewsServiceApi) {}
  async getNews(query: NewsQueryDto) {
    const params: GetQueryDto = { search: query.ticker };
    return await this.theNewsServiceApi.get(params);
  }
}
