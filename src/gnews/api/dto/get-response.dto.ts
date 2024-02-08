import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsString,
  IsNumber,
  IsObject,
  ValidateNested,
  IsUrl,
} from 'class-validator';

export class Article {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content: string;

  @IsUrl()
  url: string;

  @IsString()
  image: string;

  @IsDateString()
  publishedAt: string;

  @IsObject()
  @ValidateNested()
  source: {
    name: string;
    url: string;
  };
}

export class GetResponseDto {
  constructor(data: GetResponseDto) {
    if (data) Object.assign(this, data);
  }
  @IsNumber()
  totalArticles: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Article)
  articles: Article[];
}
