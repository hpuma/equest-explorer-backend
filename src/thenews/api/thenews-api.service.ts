import { GlobalValidator } from '@global/validation/validator.class';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GetQueryDto } from './dto/get-query.dto';
import { GetResponseDto } from './dto/get-response.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class TheNewsServiceApi {
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

    const { data } = await this.httpService.axiosRef.get('/news/all', {
      params: {
        ...validatedParams,
        api_token: this.config.get('THENEWS_API_KEY'),
      },
    });

    return await this.globalValidator.validate<GetResponseDto>(
      data,
      GetResponseDto,
    );
  }
}
