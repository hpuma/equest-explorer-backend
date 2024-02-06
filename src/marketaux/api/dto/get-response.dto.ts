import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  ValidateIf,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
class GetNewsMeta {
  @IsNumber()
  found: number;

  @IsNumber()
  returned: number;

  @IsNumber()
  limit: number;

  @IsNumber()
  page: number;
}
class HighlightItem {
  @IsString()
  highlight: string;

  @IsNumber()
  sentiment: number;

  @IsString()
  highlighted_in: string;
}

class EntityItem {
  @IsString()
  symbol: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  exchange: string;

  @IsString()
  @IsOptional()
  exchange_long: string;

  @IsString()
  country: string;

  @IsString()
  type: string;

  @IsString()
  industry: string;

  @IsNumber()
  match_score: number;

  @IsNumber()
  sentiment_score: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HighlightItem)
  highlights: HighlightItem[];
}

export class DataItem {
  @IsString()
  uuid: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  keywords: string;

  @IsString()
  snippet: string;

  @IsString()
  url: string;

  @IsString()
  image_url: string;

  @IsString()
  language: string;

  @IsString()
  published_at: string;

  @IsString()
  source: string;

  @ValidateIf((object, value) => value !== null)
  @IsNumber()
  relevance_score: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntityItem)
  entities: EntityItem[];

  @ArrayMinSize(0)
  similar: DataItem[];
}

export class GetMarketauxResponseDto {
  constructor(data: GetMarketauxResponseDto) {
    if (data) Object.assign(this, data);
  }

  @Type(() => DataItem)
  meta: GetNewsMeta;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataItem)
  data: DataItem[];
}
