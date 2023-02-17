import { QueryFunctions } from './query-functions';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class GetIntradayQueryDto {
  constructor(query: GetIntradayQueryDto) {
    if (query) Object.assign(this, query);
  }

  @IsEnum(QueryFunctions)
  function!: string;

  @IsString()
  symbol!: string;

  @IsOptional()
  @IsString()
  interval?: string;

  @IsOptional()
  @IsString()
  outputsize?: string;
}
