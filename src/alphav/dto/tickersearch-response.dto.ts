import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Format } from '@alphav/helpers/format.class';
import { GetResponseDto } from '@alphav/api/dto/get-response.dto';

export class BestMatch {
  @IsString()
  symbol: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  region: string;

  @IsString()
  marketOpen: string;

  @IsString()
  marketClose: string;

  @IsString()
  timezone: string;

  @IsString()
  currency: string;

  @IsString()
  matchScore: string;
}

export class TickerSearchResponseDto {
  constructor(data: GetResponseDto) {
    if (!data) return;

    const rawBestMatches = Format.extractBestMatches(data);
    if (!rawBestMatches) throw new Error('Unable to map rawBestMatches');

    Object.assign(this, Format.tickerSearch(rawBestMatches));
  }
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BestMatch)
  bestMatches!: BestMatch[];

  @IsNumber()
  count!: number;
}
