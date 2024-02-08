import {
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsDateString,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Result {
  @IsString()
  article_id: string;

  @IsString()
  title: string;

  @IsUrl()
  link: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  creator: string[];

  @IsOptional()
  @IsUrl()
  video_url: string | null;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  content: string;

  @IsDateString()
  pubDate: string;

  @IsOptional()
  @IsUrl()
  image_url: string | null;

  @IsString()
  source_id: string;

  @IsUrl()
  source_url: string;

  @IsNumber()
  source_priority: number;

  @IsArray()
  @IsString({ each: true })
  country: string[];

  @IsArray()
  @IsString({ each: true })
  category: string[];

  @IsString()
  language: string;

  @IsOptional()
  @IsString()
  ai_tag: string | null;

  @IsOptional()
  @IsString()
  sentiment: string | null;

  @IsOptional()
  @IsString()
  sentiment_stats: string | null;

  @IsOptional()
  @IsString()
  ai_region: string | null;
}

export class GetResponseDto {
  constructor(data: GetResponseDto) {
    if (data) Object.assign(this, data);
  }
  @IsString()
  status: string;

  @IsNumber()
  totalResults: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Result)
  results: Result[];
}
