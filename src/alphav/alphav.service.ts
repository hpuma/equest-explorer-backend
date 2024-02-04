import { Injectable } from '@nestjs/common';
import { AlphavApiService } from './api/alphav-api.service';
import { QueryFunctions } from './api/dto/utils';
import { GetQueryDto } from './api/dto';
import {
  IntradayQueryDto,
  GlobalQuoteQueryDto,
  TickerSearchQueryDto,
} from './dto';

@Injectable()
export class AlphavService {
  constructor(private alphavApiService: AlphavApiService) {}

  async getIntraday(query: IntradayQueryDto) {
    const params: GetQueryDto = {
      function: QueryFunctions.TIME_SERIES_INTRADAY,
      symbol: query.ticker,
      interval: query.interval,
      outputsize: query.datasize,
    };

    return await this.alphavApiService.get(params);
  }

  async getGlobalQuote(query: GlobalQuoteQueryDto) {
    const params: GetQueryDto = {
      function: QueryFunctions.GLOBAL_QUOTE,
      symbol: query.ticker,
    };

    return await this.alphavApiService.get(params);
  }

  async getNews(query: TickerSearchQueryDto) {
    const params: GetQueryDto = {
      function: QueryFunctions.NEWS_SENTIMENT,
      tickers: query.ticker,
    };

    return await this.alphavApiService.get(params);
  }
}
