import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlobalValidator } from '@global/global-validator.class';
import { GetQueryDto, GetBingResponseDto } from './dto';

@Injectable()
export class BingApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly globalValidator: GlobalValidator,
  ) {}
  async get(query: GetQueryDto) {
    const params: GetQueryDto = await this.globalValidator.validate(
      query,
      GetQueryDto,
    );

    const { data } = await this.httpService.axiosRef.get('/news/search', {
      params,
    });

    return await this.globalValidator.validate<GetBingResponseDto>(
      data,
      GetBingResponseDto,
    );
  }
}
