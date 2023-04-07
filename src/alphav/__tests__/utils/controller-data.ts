import { IntradayQueryDto } from '@alphav/dto/intraday-query.dto';
import { IntradayResponseDto } from '@alphav/dto/intraday-response.dto';
import { GlobalQuoteQueryDto } from '@alphav/dto/globalquote-query.dto';
import { GlobalQuoteResponseDto } from '@alphav/dto/globalquote-response.dto';
import { TickerSearchQueryDto } from '@alphav/dto/tickersearch-query.dto';
import { TickerSearchResponseDto } from '@alphav/dto/tickersearch-response.dto';

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

export function createTickerSearchQuery(
  overrides: TickerSearchQueryDto | null = { ticker: 'SPY' },
): TickerSearchQueryDto {
  return overrides;
}

export function createTickerSearchResponse(
  overrides: TickerSearchResponseDto | null = {
    bestMatches: [
      {
        symbol: 'SPY',
        name: 'SPDR S&P 500 ETF Trust',
        type: 'ETF',
        region: 'United States',
        marketOpen: '09:30',
        marketClose: '16:00',
        timezone: 'UTC-04',
        currency: 'USD',
        matchScore: '1.0000',
      },
    ],
    count: 1,
  },
): TickerSearchResponseDto {
  return overrides;
}
