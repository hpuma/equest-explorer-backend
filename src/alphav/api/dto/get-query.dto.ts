import { IsString, IsOptional, IsNumber } from 'class-validator';
import { QueryFunctions } from './utils';

export class GetQueryDto {
  constructor(query: GetQueryDto) {
    if (query) Object.assign(this, query);
  }

  @IsString()
  function!: QueryFunctions;

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

  // News  https://www.alphavantage.co/documentation/

  // tickers=IBM or multiple tickers=IBM, AMZN
  @IsOptional()
  @IsString()
  tickers?: string;

  // The news topics of your choice.
  // For example: topics = technology will filter for articles that write about the technology sector;
  // topics = technology, ipo will filter for articles that simultaneously cover technology and IPO in their content.
  @IsOptional()
  @IsString()
  topics?: string;

  @IsOptional()
  @IsString()
  time_from?: string;

  @IsOptional()
  @IsString()
  time_to?: string;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
