import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlobalValidator } from '@global/global-validator.class';
import { GetQueryDto, GetNewsResponseDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MarketauxApiService {
  private api_key: string = this.configService.get('MARKETAUX_API_KEY');
  constructor(
    private readonly httpService: HttpService,
    private readonly globalValidator: GlobalValidator,
    private readonly configService: ConfigService,
  ) {}

  async get(query: GetQueryDto) {
    const validatedParams = await this.globalValidator.validate(
      query,
      GetQueryDto,
    );

    const { api_key: api_token } = this;

    const params = {
      ...validatedParams,
      api_token,
    };

    const {
      data,
      request: { method, protocol, host },
    } = await this.httpService.axiosRef.get('/news/all', {
      params,
    });

    console.log(
      `[${method}] ${protocol}//${host}/query?${new URLSearchParams(
        params as any,
      ).toString()}`,
    );

    const validatedResponse = await this.globalValidator.validate(
      data,
      GetNewsResponseDto as any,
    );

    return validatedResponse;
  }
}
