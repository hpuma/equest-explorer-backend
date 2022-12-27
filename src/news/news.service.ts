import { Injectable } from '@nestjs/common';
import { NewsApiService } from './api/news-api.service';

@Injectable()
export class NewsService {
  constructor(private newsApiService: NewsApiService) {}

  findAllNews() {
    return this.newsApiService.getEverything();
  }
}
