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
  Article as RawArticle,
  GetEverythingResponseDto,
} from '@news/api/dto/get-everything-response.dto';
import { ApiProperty } from '@nestjs/swagger';

class Interval {
  constructor(date: Date) {
    if (!date) return;
    Object.assign(this, {
      plusone: Format.dateString(Time.roundMinute(date, 'up')),
      exact: Format.dateString(date),
      minusone: Format.dateString(Time.roundMinute(date, 'down')),
    });
  }
  @IsString()
  @ApiProperty({
    description: 'ticker price 1 min after the `exact` timestamp',
  })
  plusone: string;

  @IsString()
  @ApiProperty({
    description: 'ticker price at the `exact` timestamp',
  })
  exact: string;

  @IsString()
  @ApiProperty({
    description: 'ticker price 1 min before the `exact` timestamp',
  })
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
  @ApiProperty({
    description: 'date of the time slot',
  })
  date: string;

  @IsString()
  @ApiProperty({
    description: 'time of the time slot',
  })
  time: string;

  @ValidateNested()
  @Type(() => Interval)
  @ApiProperty({
    description: '`Interval` object representing the duration of the time slot',
    type: Interval,
  })
  interval: Interval;
}

class Article {
  constructor(rawArticle: RawArticle) {
    if (!rawArticle) return;
    const timestamp = new Timestamp(rawArticle.publishedAt);
    Object.assign(this, { ...rawArticle, timestamp });
  }

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({
    description: 'name of the author who wrote the article',
  })
  author: string;

  @IsString()
  @ApiProperty({
    description: 'title of the article',
  })
  title: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({
    description: 'short description of the article',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'URL where the article can be found',
  })
  url: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({
    description: 'URL of an image that is associated with the article',
  })
  urlToImage: string;

  @IsString()
  @ApiProperty({
    description: 'main content of the article',
  })
  content: string;

  @ValidateNested()
  @Type(() => Timestamp)
  @ApiProperty({
    description:
      '`Timestamp` object representing the date and time when the article was published',
    type: Timestamp,
  })
  timestamp: Timestamp;
}

export class EverythingResponseDto {
  constructor(data: GetEverythingResponseDto) {
    if (!data) return;
    Object.assign(this, {
      articles: data.articles.map((rawArticles) => new Article(rawArticles)),
      count: data.totalResults,
    });
  }

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Article)
  @ApiProperty({
    description: 'List of `Articles` related to the ticker',
    type: Article,
  })
  articles: Article[];

  @IsNumber()
  @ApiProperty({
    description: 'number of `Articles` related to the ticker',
    example: '115',
  })
  count: number;
}
