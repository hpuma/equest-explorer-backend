import { QueryFunctions } from './query-functions';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class GetQueryDto {
  constructor(query: GetQueryDto) {
    if (query) Object.assign(this, query);
  }

  @IsEnum(QueryFunctions)
  function!: string;

  @IsOptional()
  @IsString()
  symbol?: string;

  @IsOptional()
  @IsString()
  interval?: string;

  @IsOptional()
  @IsString()
  outputsize?: string;

  @IsOptional()
  @IsString()
  keywords?: string;
}
