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

  async get(query: GetQueryDto): Promise<GetNewsResponseDto> {
    const validatedParams = await this.globalValidator.validate(
      query,
      GetQueryDto,
    );

    const { api_key: api_token } = this;

    const params = {
      ...validatedParams,
      api_token,
    };

    const { data } = await this.httpService.axiosRef.get('/news/all', {
      params,
      headers: {
        'Accept-Encoding': '*',
      },
    });

    const validatedResponse =
      await this.globalValidator.validate<GetNewsResponseDto>(
        data,
        GetNewsResponseDto,
      );

    return validatedResponse;
  }
}
