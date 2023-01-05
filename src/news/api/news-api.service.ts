import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// Global VALIDATOR
import { ApiQueryValidator } from '@validation/ApiQueryValidator.class';

// Api PARAMETER METHOD DTOS

import { EverythingDto } from '@news/dto/everything.dto';

// Api VALIDATORS/DTOS
// getEverything
import { GetEverythingDto } from './dto/get-everything.dto';

@Injectable()
export class NewsApiService {
  constructor(private readonly httpService: HttpService) {}

  async getEverything(query: EverythingDto) {
    const params = await new ApiQueryValidator(query).validate(
      GetEverythingDto,
    );

    return this.httpService.axiosRef.get('/everything', {
      params,
    });
  }
}
