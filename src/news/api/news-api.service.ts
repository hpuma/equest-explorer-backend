import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlobalValidator } from '@global/global-validator.class';
import { GetEverythingQueryDto, GetResponseDto } from './dto';

@Injectable()
export class NewsApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly globalValidator: GlobalValidator,
  ) {}

  async get(query: GetEverythingQueryDto) {
    const params: GetEverythingQueryDto = await this.globalValidator.validate(
      query,
      GetEverythingQueryDto,
    );

    const { data } = await this.httpService.axiosRef.get('/everything', {
      params,
      headers: {
        'Accept-Encoding': '*',
      },
    });

    return await this.globalValidator.validate(data, GetResponseDto);
  }
}
