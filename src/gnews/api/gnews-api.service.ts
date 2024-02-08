import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlobalValidator } from '@global/validation/validator.class';
import { GetQueryDto } from './dto/get-query.dto';
import { GetResponseDto } from './dto/get-response.dto';
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
