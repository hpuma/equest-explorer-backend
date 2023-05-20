import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// GlobalValidator: Validator used for validating and transforming
import { GlobalValidator } from '@global/global-validator.class';
import { GetQueryDto, GetResponseDto } from './dto';

@Injectable()
export class AlphavApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly globalValidator: GlobalValidator,
  ) {}

  async get(query: GetQueryDto): Promise<GetResponseDto> {
    const params = await this.globalValidator.validate(query, GetQueryDto);

    const { data } = await this.httpService.axiosRef.get('', {
      params,
    });

    const validatedResponse = await this.globalValidator.validate(
      data,
      GetResponseDto,
    );

    return validatedResponse;
  }
}
