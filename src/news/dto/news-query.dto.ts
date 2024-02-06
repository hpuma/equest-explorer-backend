import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { tickerApiDoc } from '@global/documentation/query';

export class NewsQueryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty(tickerApiDoc)
  ticker!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: `The fields to restrict your 'ticker' search to
    Multiple options can be specified by separating them with a comma, 
    for example: title,content`,
    required: false,
    enum: ['title', 'description', 'content'],
  })
  contentSource?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'A comma-seperated string of identifiers (maximum 20) for the news sources or blogs you want headlines from. Use the /sources endpoint to locate these programmatically or look at the sources index. ',
    required: false,
  })
  newsSource?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'A date and optional time for the oldest article allowed. This should be in ISO 8601 format. Examples include 2023-04-07, 2023-04-07T02:16:54',
    required: false,
  })
  startDate?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'A date and optional time for the newest article allowed. This should be in ISO 8601 format. Examples include 2023-04-07, 2023-04-07T02:16:54',
    required: false,
  })
  endDate?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: `The order to sort the articles in 
    relevancy = articles more closely related to q come first.
    popularity = articles from popular sources and publishers come first.
    publishedAt = newest articles come first`,
    required: false,
    enum: ['relevancy', 'popularity', 'publishedAt'],
  })
  sortBy?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'The 2-letter ISO-639-1 code of the language you want to get headlines for',
    required: false,
    enum: [
      'ar',
      'de',
      'en',
      'es',
      'fr',
      'he',
      'it',
      'nl',
      'no',
      'pt',
      'ru',
      'sv',
      'ud',
      'zh',
    ],
  })
  language?: string;
}
