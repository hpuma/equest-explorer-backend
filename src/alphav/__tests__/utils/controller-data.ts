import {
  IntradayQueryDto,
  IntradayResponseDto,
  GlobalQuoteQueryDto,
  GlobalQuoteResponseDto,
  NewsQueryDto,
  NewsResponseDto,
} from '@alphav/dto';

export function createIntradayQuery(
  overrides: IntradayQueryDto | null = { ticker: 'SPY', interval: '1min' },
): IntradayQueryDto {
  return overrides;
}

export function createIntradayResponse(
  overrides: IntradayResponseDto | null = {
    metadata: {
      info: 'Intraday (1min) open, high, low, close prices and volume',
      symbol: 'SPY',
      lastupdated: '2023-03-10 20:00:00',
      interval: '1min',
      size: 'Compact',
      timezone: 'US/Eastern',
    },
    interval: 'one',
    timeseries: {
      '2023-03-10 20:00:00': {
        open: '387.1300',
        high: '387.2000',
        low: '387.0600',
        close: '387.0600',
        volume: '3729',
      },
    },
    chartTimeSeries: [
      {
        x: new Date('6:41:00 PM'),
        y: [386.82, 386.82, 386.8, 386.8],
      },
    ],
  },
): IntradayResponseDto {
  return overrides;
}

export function createGlobalQuoteQuery(
  overrides: GlobalQuoteQueryDto | null = { ticker: 'SPY' },
): GlobalQuoteQueryDto {
  return overrides;
}

export function createGlobalQuoteResponse(
  overrides: GlobalQuoteResponseDto | null = {
    symbol: 'SPY',
    open: '390.9900',
    high: '393.1600',
    low: '384.3200',
    price: '385.9100',
    volume: '189252996',
    latestTradingDay: '2023-03-10',
    previousClose: '391.5600',
    change: '-5.6500',
    changePercent: '-1.4429%',
  },
): GlobalQuoteResponseDto {
  return overrides;
}

export function createGetNewsQuery(
  overrides: NewsQueryDto | null = { ticker: 'SPY' },
): NewsQueryDto {
  return overrides;
}

export function createNewsSentimentResponseDto(
  overrides: NewsResponseDto | null = {
    articles: [],
    count: 2,
    ticker: 'SPY',
  },
): NewsResponseDto {
  return overrides;
}
