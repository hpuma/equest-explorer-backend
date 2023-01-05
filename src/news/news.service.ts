import { Injectable } from '@nestjs/common';
import { NewsApiService } from './api/news-api.service';
import { EverythingDto } from './dto/everything.dto';

@Injectable()
export class NewsService {
  constructor(private newsApiService: NewsApiService) {}

  async getEverything(query: EverythingDto) {
    const { data } = await this.newsApiService.getEverything(query);

    return data;
  }
}
