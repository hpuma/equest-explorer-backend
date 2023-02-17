import { Injectable } from '@nestjs/common';
import { AlphavApiService } from './api/alphav-api.service';
import { IntradayQueryDto } from './dto/intraday-query.dto';
import { GetQueryDto } from './api/dto/get-query.dto';
import { QueryFunctions } from './api/dto/query-functions';

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
}
