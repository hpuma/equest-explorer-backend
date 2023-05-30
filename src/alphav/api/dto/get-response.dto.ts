import {
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GlobalQuote {
  @IsString()
  '01. symbol': string;

  @IsString()
  '02. open': string;

  @IsString()
  '03. high': string;

  @IsString()
  '04. low': string;

  @IsString()
  '05. price': string;

  @IsString()
  '06. volume': string;

  @IsString()
  '07. latest trading day': string;

  @IsString()
  '08. previous close': string;

  @IsString()
  '09. change': string;

  @IsString()
  '10. change percent': string;
}
// QUOTE
export class GetQuoteDto {
  constructor(data: GetQuoteDto) {
    if (data) Object.assign(this, data);
  }

  @IsNotEmpty()
  @Type(() => GlobalQuote)
  'Global Quote': GlobalQuote;
}

export class TimeseriesData {
  @IsString()
  '1. open': string;

  @IsString()
  '2. high': string;

  @IsString()
  '3. low': string;

  @IsString()
  '4. close': string;

  @IsString()
  '5. volume': string;
}

export class Timeseries {
  [key: string]: TimeseriesData;
}

export class MetaData {
  constructor(data: MetaData) {
    if (data) Object.assign(this, data);
  }
  @IsString()
  '1. Information': string;

  @IsString()
  '2. Symbol': string;

  @IsString()
  '3. Last Refreshed': string;

  @IsString()
  '4. Interval': string;

  @IsString()
  '5. Output Size': string;

  @IsString()
  '6. Time Zone': string;
}
// INTRADAY
export class GetIntradayDto {
  constructor(data: GetIntradayDto) {
    if (data) Object.assign(this, data);
  }

  @IsNotEmpty()
  @Type(() => MetaData)
  'Meta Data'!: MetaData;

  @Type(() => Timeseries)
  'Time Series (1min)'?: Timeseries;

  @Type(() => Timeseries)
  'Time Series (5min)'?: Timeseries;

  @Type(() => Timeseries)
  'Time Series (15min)'?: Timeseries;

  @Type(() => Timeseries)
  'Time Series (30min)'?: Timeseries;

  @Type(() => Timeseries)
  'Time Series (60min)'?: Timeseries;
}

export class FeedTopics {
  @IsString()
  topic: string;

  @IsString()
  relevance_score: string;
}

class TickerSentiment {
  @IsString()
  ticker: string;

  @IsString()
  relevance_score: string;

  @IsString()
  ticker_sentiment_score: string;

  @IsString()
  ticker_sentiment_label: string;
}

export class NewsSentimentFeed {
  @IsString()
  title: string;

  @IsString()
  url: string;

  @IsString()
  time_published: string;

  @IsArray()
  authors: string[];

  @IsString()
  summary: string;

  @IsString()
  banner_image: string;

  @IsString()
  source: string;

  @IsString()
  category_within_source: string;

  @IsString()
  source_domain: string;
  topics: FeedTopics[];

  @IsNumber()
  overall_sentiment_score: number;

  @IsString()
  overall_sentiment_label: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TickerSentiment)
  ticker_sentiment: TickerSentiment[];
}
// NEWS
export class GetNewsSentimentDto {
  constructor(data: GetNewsSentimentDto) {
    if (data) Object.assign(this, data);
  }
  @IsString()
  items: string;

  @IsString()
  sentiment_score_definition: string;

  @IsString()
  relevance_score_definition: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NewsSentimentFeed)
  feed: NewsSentimentFeed[];
}

export class BestMatch {
  @IsString()
  '1. symbol': string;

  @IsString()
  '2. name': string;

  @IsString()
  '3. type': string;

  @IsString()
  '4. region': string;

  @IsString()
  '5. marketOpen': string;

  @IsString()
  '6. marketClose': string;

  @IsString()
  '7. timezone': string;

  @IsString()
  '8. currency': string;

  @IsString()
  '9. matchScore': string;
}
// TICKER SEARCH
export class GetTickerSearchDto {
  constructor(data: GetTickerSearchDto) {
    if (data) Object.assign(this, data);
  }
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BestMatch)
  bestMatches?: BestMatch[];
}
