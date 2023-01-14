import { EverythingDto } from '@news/dto/everything.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class GetEverythingDto {
  @IsNotEmpty()
  q!: string;

  @IsOptional()
  @IsString()
  searchIn?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  language?: string;

  constructor(query: EverythingDto) {
    if (query) {
      Object.assign(this, {
        q: query.ticker,
        searchIn: query.contentSource,
        source: query.newsSource,
        from: query.startDate,
        to: query.endDate,
        sortBy: query.sortBy,
        language: query.language,
      });
    }
  }
}
