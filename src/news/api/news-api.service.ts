import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import apisConfig from '@configs/apis.config';

// Global VALIDATOR
import { ApiQueryValidator } from '../../validation/ApiQueryValidator.class';

// Api PARAMETER METHOD DTOS

import { EverythingDto } from '../dto/everything.dto';

// Api VALIDATORS/DTOS
// getEverything
import { GetEverythingValidator } from './validation/get-everything-validator';
import { GetEverythingDto } from './validation/dto/get-everything.dto';

@Injectable()
export class NewsApiService {
  private apiKey: string;
  constructor(
    private readonly httpService: HttpService,
    @Inject(apisConfig.KEY)
    newsApiConfig: ConfigType<typeof apisConfig>,
  ) {
    httpService.axiosRef.defaults.baseURL = newsApiConfig.newsApiBaseURL;
    this.apiKey = newsApiConfig.newsApiKey;
  }

  async getEverything(query: EverythingDto) {
    // delete query.ticker;
    const validator = new ApiQueryValidator<
      EverythingDto,
      typeof GetEverythingDto
    >(query, GetEverythingValidator<GetEverythingDto>, GetEverythingDto);

    const mappedQuery = await validator.validate();

    return mappedQuery;
  }
}
