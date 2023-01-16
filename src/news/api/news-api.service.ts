import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// GlobalValidator: Validator used for validating and transforming
import { GlobalValidator } from '@global/validation/global-validator.class';

// NewsApiService: dtos that undergo validation pre/post http request
import { GetEverythingQueryDto } from './dto/get-everything-query.dto';
import { GetEverythingResponseDto } from './dto/get-everything-response.dto';

@Injectable()
export class NewsApiService {
  constructor(private readonly httpService: HttpService) {}

  async getEverything(
    query: GetEverythingQueryDto,
  ): Promise<GetEverythingResponseDto> {
    const params = await new GlobalValidator<GetEverythingQueryDto>(
      query,
      GetEverythingQueryDto,
    ).validate();

    const { data } = await this.httpService.axiosRef.get('/everything', {
      params,
    });

    const validatedResponse =
      await new GlobalValidator<GetEverythingResponseDto>(
        data,
        GetEverythingResponseDto,
      ).validate();

    return validatedResponse;
  }
}
