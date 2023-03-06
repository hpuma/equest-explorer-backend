import { Type } from 'class-transformer';
import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';

class BestMatch {
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

class TimeseriesData {
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

export class GetResponseDto {
  constructor(data: GetResponseDto) {
    if (data) Object.assign(this, data);
  }

  @Type(() => MetaData)
  'Meta Data'?: MetaData;

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

  @Type(() => GlobalQuote)
  'Global Quote'?: GlobalQuote;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BestMatch)
  bestMatches?: BestMatch[];
}
