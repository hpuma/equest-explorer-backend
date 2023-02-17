import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// GlobalValidator: Validator used for validating and transforming
import { GlobalValidator } from '@global/validation/global-validator.class';

import { GetQueryDto } from './dto/get-query.dto';
import { GetResponseDto } from './dto/get-response.dto';

@Injectable()
export class AlphavApiService {
  constructor(private readonly httpService: HttpService) {}

  async get(query: GetQueryDto): Promise<GetResponseDto> {
    const params = await new GlobalValidator<GetQueryDto>(
      query,
      GetQueryDto,
    ).validate();

    const { data } = await this.httpService.axiosRef.get('', {
      params,
    });

    const validatedResponse = await new GlobalValidator<GetResponseDto>(
      data,
      GetResponseDto,
    ).validate();

    return validatedResponse;
  }
}
