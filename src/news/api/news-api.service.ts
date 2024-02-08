import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlobalValidator } from '@global/validation/validator.class';
import { GetEverythingQueryDto } from './dto/get-query.dto';
import { GetResponseDto } from './dto/get-response.dto';
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
    });

    return await this.globalValidator.validate(data, GetResponseDto);
  }
}
