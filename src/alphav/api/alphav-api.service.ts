import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { QueryFunctions } from './dto/utils';
// GlobalValidator: Validator used for validating and transforming
import { GlobalValidator } from '@global/global-validator.class';
import {
  GetQueryDto,
  GetIntradayDto,
  GetQuoteDto,
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
  ): Promise<GetIntradayDto | GetQuoteDto | GetTickerSearchDto> {
    const params = await this.globalValidator.validate(query, GetQueryDto);

    const {
      data,
      request: { method, protocol, host },
    } = await this.httpService.axiosRef.get('', {
      params,
    });

    console.log(
      `[${method}] ${protocol}//${host}/?${new URLSearchParams(
        params as any,
      ).toString()}`,
    );

    const ResponseDto = MapQueryToResponse(QueryFunctions[query.function]);

    const validatedResponse = await this.globalValidator.validate(
      data,
      ResponseDto as any,
    );

    return validatedResponse;
  }
}
