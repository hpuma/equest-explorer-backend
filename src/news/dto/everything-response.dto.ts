import {
  IsArray,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Format } from '../helpers/format.class';
import { Time } from '../helpers/time.class';
import {
  Article,
  GetEverythingResponseDto,
} from '@news/api/dto/get-everything-response.dto';

class Interval {
  constructor(date: Date) {
    if (!date) return;
    Object.assign(this, {
      plusone: Format.dateString(Time.roundMinute(date, 'up')),
      exact: Format.dateString(date),
      minusone: Format.dateString(Time.roundMinute(date, 'down')),
    });
  }
  plusone: string;
  exact: string;
  minusone: string;
}

class Timestamp {
  constructor(publishedAt: string) {
    if (!publishedAt) return;
    const date = new Date(publishedAt);
    Object.assign(this, {
      date: Format.date(date),
      time: Format.time(date),
      interval: new Interval(date),
    });
  }

  @IsString()
  date: string;

  @IsString()
  time: string;

  @ValidateNested()
  @Type(() => Interval)
  interval: Interval;
}

class Result {
  constructor(article: Article) {
    if (!article) return;
    const timestamp = new Timestamp(article.publishedAt);
    Object.assign(this, { ...article, timestamp });
  }

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

  @IsString()
  content: string;

  @ValidateNested()
  @Type(() => Timestamp)
  timestamp: Timestamp;
}

export class EverythingResponseDto {
  constructor(data: GetEverythingResponseDto) {
    if (!data) return;
    Object.assign(this, {
      results: data.articles.map((article) => new Result(article)),
      count: data.totalResults,
    });
  }

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Result)
  results: Result[];

  @IsNumber()
  count: number;
}
