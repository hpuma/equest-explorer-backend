import { Injectable } from '@nestjs/common';
import { NewsApiService } from './api/news-api.service';

@Injectable()
export class NewsService {
  constructor(private newsApiService: NewsApiService) {}

  findAll() {
    return `This action returns all news`;
  }
}
