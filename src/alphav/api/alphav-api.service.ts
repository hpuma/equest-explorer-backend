import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// GlobalValidator: Validator used for validating and transforming
import { GlobalValidator } from '@global/validation/global-validator.class';

import { GetIntradayQueryDto } from './dto/get-intraday-query.dto';
import { GetIntradayResponseDto } from './dto/get-intraday-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AlphavApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getIntraday(
    query: GetIntradayQueryDto,
  ): Promise<GetIntradayResponseDto> {
    const params = await new GlobalValidator<GetIntradayQueryDto>(
      query,
      GetIntradayQueryDto,
    ).validate();

    const { data } = await this.httpService.axiosRef.get('', {
      params,
    });

    const validatedResponse = await new GlobalValidator<GetIntradayResponseDto>(
      data,
      GetIntradayResponseDto,
    ).validate();

    return validatedResponse;
  }
}
