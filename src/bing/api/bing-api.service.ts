import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlobalValidator } from '@global/validation/validator.class';
import { GetQueryDto } from './dto/get-query.dto';
import { GetResponseDto } from './dto/get-response.dto';
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

    return await this.globalValidator.validate<GetResponseDto>(
      data,
      GetResponseDto,
    );
  }
}
