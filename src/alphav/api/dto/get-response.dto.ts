import {
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BestMatch {
  constructor(data: BestMatch) {
    if (data) Object.assign(this, data);
  }
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

export class GlobalQuote {
  constructor(data: GlobalQuote) {
    if (data) Object.assign(this, data);
  }

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

export class TimeseriesData {
  constructor(data: TimeseriesData) {
    if (data) Object.assign(this, data);
  }
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

export class GetQuoteDto {
  constructor(data: GetQuoteDto) {
    if (data) Object.assign(this, data);
  }

  @IsNotEmpty()
  @Type(() => GlobalQuote)
  'Global Quote': GlobalQuote;
}

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
