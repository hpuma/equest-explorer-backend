import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  ValidateNested,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class Interval {
  constructor(data: Interval) {
    Object.assign(this, data);
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

export class Timestamp {
  constructor(data: Timestamp) {
    Object.assign(this, data);
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

export class Article {
  constructor(data: Article) {
    Object.assign(this, data);
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

  @IsString()
  hash?: string;
}

export class NewsResource {
  constructor(data: NewsResource) {
    Object.assign(this, data);
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
