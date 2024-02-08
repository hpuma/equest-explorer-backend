import {
  ValidateNested,
  ValidateIf,
  IsObject,
  IsString,
  IsNumber,
  IsArray,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

class Source {
  @IsString()
  @ValidateIf((object, value) => value !== null)
  id: string;

  @IsString()
  name: string;
}

export class Article {
  @IsObject()
  @ValidateNested()
  @Type(() => Source)
  source: Source;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  author: string;

  @IsString()
  title: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  description: string;

  @IsString()
  url: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  urlToImage: string;

  @IsDateString()
  publishedAt: string;

  @IsString()
  content: string;
}

export class GetResponseDto {
  constructor(data: GetResponseDto) {
    if (data) Object.assign(this, data);
  }
  @IsString()
  status?: string;

  @IsNumber()
  totalResults?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Article)
  articles: Article[];
}
