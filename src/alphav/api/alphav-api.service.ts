import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { QueryFunctions } from './dto/utils';
// GlobalValidator: Validator used for validating and transforming
import { GlobalValidator } from '@global/global-validator.class';
import {
  GetQueryDto,
  GetIntradayDto,
  GetQuoteDto,
  GetNewsSentimentDto,
  GetTickerSearchDto,
} from './dto';
import { MapQueryToResponse } from './dto/utils';

@Injectable()
export class AlphavApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly globalValidator: GlobalValidator,
  ) {}

  async get(
    query: GetQueryDto,
  ): Promise<
    GetIntradayDto | GetQuoteDto | GetNewsSentimentDto | GetTickerSearchDto
  > {
    const params = await this.globalValidator.validate(query, GetQueryDto);

    const { data } = await this.httpService.axiosRef.get('', {
      params,
    });

    const ResponseDto = MapQueryToResponse(QueryFunctions[query.function]);

    const validatedResponse = await this.globalValidator.validate(
      data,
      ResponseDto as any,
    );

    return validatedResponse;
  }
}
