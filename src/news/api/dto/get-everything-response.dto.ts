import {
  ValidateNested,
  ValidateIf,
  IsObject,
  IsString,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class Source {
  @IsString()
  @ValidateIf((object, value) => value !== null)
  id: string;

  @IsString()
  name: string;
}

class Article {
  @IsObject()
  @ValidateNested()
  @Type(() => Source)
  source: Source;

  @IsString()
  title: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  author: string;

  @IsString()
  content: string;

  @IsString()
  url: string;

  @IsString()
  urlToImage: string;

  @IsString()
  publishedAt: string;

  @IsString()
  description: string;
}

export class GetEverythingResponseDto {
  constructor(data: GetEverythingResponseDto) {
    if (data) Object.assign(this, data);
  }
  @IsString()
  status: string;

  @IsNumber()
  totalResults: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Article)
  articles: Article;
}
