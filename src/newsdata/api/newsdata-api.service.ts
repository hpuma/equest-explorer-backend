import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlobalValidator } from '@global/global-validator.class';
import { GetQueryDto, GetResponseDto } from './dto';
@Injectable()
export class NewsDataApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly globalValidator: GlobalValidator,
  ) {}
  async get(query: GetQueryDto) {
    const params = await this.globalValidator.validate(query, GetQueryDto);

    const { data } = await this.httpService.axiosRef.get('/news', {
      params,
    });
    return await this.globalValidator.validate<GetResponseDto>(
      data,
      GetResponseDto,
    );
  }
}
