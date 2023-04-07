import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Format } from '@alphav/helpers/format.class';
import { GetResponseDto } from '@alphav/api/dto/get-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BestMatch {
  @IsString()
  @ApiProperty({
    description: 'stock ticker',
    example: 'IBM',
  })
  symbol: string;

  @IsString()
  @ApiProperty({
    description: 'full company name',
    example: 'International Business Machines Corp',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'type of security',
    example: 'Equity',
  })
  type: string;

  @IsString()
  @ApiProperty({
    description: 'geographic region where the company is located',
    example: 'United States',
  })
  region: string;

  @IsString()
  @ApiProperty({
    description: 'market open close price',
    example: '117',
  })
  marketOpen: string;

  @IsString()
  @ApiProperty({
    description: 'market close price',
    example: '118',
  })
  marketClose: string;

  @IsString()
  @ApiProperty({
    description: 'time offset identifier',
    example: 'UTC-04',
  })
  timezone: string;

  @IsString()
  @ApiProperty({
    description: 'asset currency type',
    example: 'USD',
  })
  currency: string;

  @IsString()
  @ApiProperty({
    description:
      'score or level of relevance of the data that was returned in response to a search query or filter',
    example: '0.97',
  })
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
  @ApiProperty({
    description:
      'List of `BestMatch` objects containing matches for ticker value',
    type: BestMatch,
    isArray: true,
  })
  bestMatches!: BestMatch[];

  @IsNumber()
  @ApiProperty({
    description: 'number of `BestMatch`s found',
    example: 5,
  })
  count!: number;
}
