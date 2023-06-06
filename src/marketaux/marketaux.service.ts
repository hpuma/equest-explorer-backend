import { Injectable } from '@nestjs/common';
import { MarketauxApiService } from './api/marketaux-api.service';
import { GetQueryDto } from './api/dto';
import { NewsQueryDto } from './dto/get-query.dto';

@Injectable()
export class MarketauxService {
  constructor(private marketauxApiService: MarketauxApiService) {}
  async getNews({ ticker }: NewsQueryDto) {
    try {
      const params: GetQueryDto = {
        symbols: ticker,
        entity_types: 'equity',
        filter_entities: true,
      };

      return this.marketauxApiService.get(params);
    } catch (e) {
      console.log(e.message);
    }
  }
}
