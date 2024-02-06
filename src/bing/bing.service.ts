import { Injectable } from '@nestjs/common';
import { NewsQueryDto } from './dto';
import { GetQueryDto } from './api/dto';
import { BingApiService } from './api/bing-api.service';

@Injectable()
export class BingService {
  constructor(private bingApiService: BingApiService) {}

  async getNews({ ticker }: NewsQueryDto) {
    const params: GetQueryDto = {
      q: ticker,
      freshness: 'day',
    };
    return await this.bingApiService.get(params);
  }
}
