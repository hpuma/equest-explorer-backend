class BestMatch {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
}

class GlobalQuote {
  '01. symbol': string;
  '02. open': string;
  '03. high': string;
  '04. low': string;
  '05. price': string;
  '06. volume': string;
  '07. latest trading day': string;
  '08. previous close': string;
  '09. change': string;
  '10. change percent': string;
}

export interface TimeseriesData {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

export class Timeseries {
  [key: string]: TimeseriesData;
}
export class MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Interval': string;
  '5. Output Size': string;
  '6. Time Zone': string;
}

export class GetIntradayResponseDto {
  constructor(data: GetIntradayResponseDto) {
    if (data) Object.assign(this, data);
  }
  'Meta Data'?: MetaData;
  'Time Series (1min)'?: Timeseries;
  'Time Series (5min)'?: Timeseries;
  'Time Series (15min)'?: Timeseries;
  'Time Series (30min)'?: Timeseries;
  'Time Series (60min)'?: Timeseries;
  'Global Quote'?: GlobalQuote;
  bestMatches: BestMatch[];
}
