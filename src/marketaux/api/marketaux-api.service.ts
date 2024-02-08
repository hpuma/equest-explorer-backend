import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlobalValidator } from '@global/global-validator.class';
import { GetQueryDto, GetResponseDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MarketauxApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly globalValidator: GlobalValidator,
    private readonly configService: ConfigService,
  ) {}

  async get(query: GetQueryDto) {
    const validatedParams: GetQueryDto = await this.globalValidator.validate(
      query,
      GetQueryDto,
    );

    const { data } = await this.httpService.axiosRef.get('/news/all', {
      params: {
        ...validatedParams,
        api_token: this.configService.get('MARKETAUX_API_KEY'),
      },
    });

    return await this.globalValidator.validate<GetResponseDto>(
      data,
      GetResponseDto,
    );
  }
}
