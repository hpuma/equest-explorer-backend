import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlobalValidator } from '@global/global-validator.class';
import { GetQueryDto, GetResponseDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GNewsApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly globalValidator: GlobalValidator,
    private readonly config: ConfigService,
  ) {}

  async get(query: GetQueryDto) {
    const validatedParams: GetQueryDto = await this.globalValidator.validate(
      query,
      GetQueryDto,
    );

    const { data } = await this.httpService.axiosRef.get('/search', {
      params: {
        ...validatedParams,
        apikey: this.config.get('GNEWS_API_KEY'),
      },
    });

    return await this.globalValidator.validate<GetResponseDto>(
      data,
      GetResponseDto,
    );
  }
}
