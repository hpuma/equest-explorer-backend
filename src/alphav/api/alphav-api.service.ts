import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlobalValidator } from '@global/validation/validator.class';
import {
  QueryFunctions,
  MapQueryToResponse,
  GetResponseDto,
} from './dto/utils';
import { GetQueryDto } from './dto';
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

    const ResponseDto: ClassConstructor<GetResponseDto> = MapQueryToResponse(
      QueryFunctions[query.function],
    );

    return await this.globalValidator.validate<GetResponseDto>(
      data,
      ResponseDto,
    );
  }
}
