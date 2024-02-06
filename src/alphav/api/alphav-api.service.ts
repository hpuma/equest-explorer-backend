import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlobalValidator } from '@global/global-validator.class';
import { QueryFunctions } from './dto/utils';
import { GetQueryDto } from './dto';
import { MapQueryToResponse, GetAlphavResponseDto } from './dto/utils';
import { ClassConstructor } from 'class-transformer';

@Injectable()
export class AlphavApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly globalValidator: GlobalValidator,
  ) {}

  async get(query: GetQueryDto) {
    const params: GetQueryDto = await this.globalValidator.validate(
      query,
      GetQueryDto,
    );

    const { data } = await this.httpService.axiosRef.get('', {
      params,
    });

    if (data.Information) return null;
    const ResponseDto: ClassConstructor<GetAlphavResponseDto> =
      MapQueryToResponse(QueryFunctions[query.function]);

    return await this.globalValidator.validate<GetAlphavResponseDto>(
      data,
      ResponseDto,
    );
  }
}
