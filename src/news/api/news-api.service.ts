import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// Global VALIDATOR
import { GlobalValidator } from '@validation/global-validator.class';

// Api PARAMETER METHOD DTOS

import { EverythingDto } from '@news/dto/everything.dto';

// Api VALIDATORS/DTOS
// getEverything
import { GetEverythingDto } from './dto/get-everything.dto';
import { GetEverythingResponseDto } from './dto/get-everything-response.dto';

@Injectable()
export class NewsApiService {
  constructor(private readonly httpService: HttpService) {}

  async getEverything(query: EverythingDto): Promise<GetEverythingResponseDto> {
    const params = await new GlobalValidator<GetEverythingDto>(
      query,
      GetEverythingDto,
    ).validate();

    const response = await this.httpService.axiosRef.get('/everything', {
      params,
    });

    const validatedResponse =
      await new GlobalValidator<GetEverythingResponseDto>(
        response.data,
        GetEverythingResponseDto,
      ).validate();

    return validatedResponse;
  }
}
