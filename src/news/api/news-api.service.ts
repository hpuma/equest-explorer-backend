import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// GlobalValidator: Validator used for validating and transforming
import { GlobalValidator } from '@global/global-validator.class';

// NewsApiService: dtos that undergo validation pre/post http request
import { GetEverythingQueryDto, GetEverythingResponseDto } from './dto';

@Injectable()
export class NewsApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly globalValidator: GlobalValidator,
  ) {}

  async getEverything(
    query: GetEverythingQueryDto,
  ): Promise<GetEverythingResponseDto> {
    const params = await this.globalValidator.validate(
      query,
      GetEverythingQueryDto,
    );

    const { data } = await this.httpService.axiosRef.get('/everything', {
      params,
      headers: {
        'Accept-Encoding': '*',
      },
    });

    const validatedResponse = await this.globalValidator.validate(
      data,
      GetEverythingResponseDto,
    );

    return validatedResponse;
  }
}
