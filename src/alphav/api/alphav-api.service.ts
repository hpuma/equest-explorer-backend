import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { QueryFunctions } from './dto/utils';
import { GlobalValidator } from '@global/global-validator.class';
import { GetQueryDto } from './dto';
import { MapQueryToResponse, GetAlphavResponseDto } from './dto/utils';
import { ClassConstructor } from 'class-transformer';

@Injectable()
export class AlphavApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly globalValidator: GlobalValidator,
  ) {}

  async get(query: GetQueryDto): Promise<GetAlphavResponseDto> {
    const params = await this.globalValidator.validate(query, GetQueryDto);

    const { data } = await this.httpService.axiosRef.get('', {
      params,
    });

    if (data.Information) return null;
    const ResponseDto = MapQueryToResponse(QueryFunctions[query.function]);

    const validatedResponse =
      await this.globalValidator.validate<GetAlphavResponseDto>(
        data,
        ResponseDto as ClassConstructor<GetAlphavResponseDto>,
      );

    return validatedResponse;
  }
}
