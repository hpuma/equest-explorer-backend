import { GetIntradayDto } from '@alphav/api/dto';

export function createGetResponse(
  overrides: GetIntradayDto | null = {
    'Meta Data': {
      '1. Information':
        'Intraday (1min) open, high, low, close prices and volume',
      '2. Symbol': 'AAPL',
      '3. Last Refreshed': '2023-03-10 20:00:00',
      '4. Interval': '1min',
      '5. Output Size': 'Compact',
      '6. Time Zone': 'US/Eastern',
    },
    'Time Series (1min)': {
      '2023-03-10 20:00:00': {
        '1. open': '148.6000',
        '2. high': '148.6000',
        '3. low': '148.6000',
        '4. close': '148.6000',
        '5. volume': '1218',
      },
    },
  },
): GetIntradayDto {
  return overrides;
}
