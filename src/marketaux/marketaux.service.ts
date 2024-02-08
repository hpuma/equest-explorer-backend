import { Injectable } from '@nestjs/common';
import { NewsQueryDto } from './dto/news-query.dto';
import { GetQueryDto } from './api/dto/get-query.dto';
import { MarketauxApiService } from './api/marketaux-api.service';

@Injectable()
export class MarketauxService {
  constructor(private marketauxApiService: MarketauxApiService) {}

  async getNews({ ticker }: NewsQueryDto) {
    const params: GetQueryDto = {
      symbols: ticker,
      entity_types: 'equity',
      filter_entities: true,
    };
    return this.marketauxApiService.get(params);
  }
}
