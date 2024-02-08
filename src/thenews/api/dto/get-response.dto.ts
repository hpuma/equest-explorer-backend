import {
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  IsDateString,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

class Meta {
  @IsNumber()
  found: number;

  @IsNumber()
  returned: number;

  @IsNumber()
  limit: number;

  @IsNumber()
  page: number;
}

export class Data {
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

  @IsUrl()
  url: string;

  @IsUrl()
  image_url: string;

  @IsString()
  language: string;

  @IsDateString()
  published_at: string;

  @IsString()
  source: string;

  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @IsOptional()
  @IsString()
  relevance_score: string | null;
}

export class GetResponseDto {
  constructor(data: GetResponseDto) {
    if (data) Object.assign(this, data);
  }

  @Type(() => Meta)
  meta: Meta;

  @Type(() => Data)
  data: any;
}
