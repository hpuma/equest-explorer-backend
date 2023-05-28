import { GetIntradayDto, GetQuoteDto, GetTickerSearchDto } from './';

export enum QueryFunctions {
  TIME_SERIES_INTRADAY = 'TIME_SERIES_INTRADAY',
  GLOBAL_QUOTE = 'GLOBAL_QUOTE',
  SYMBOL_SEARCH = 'SYMBOL_SEARCH',
  NEWS_SENTIMENT = 'NEWS_SENTIMENT',
}

export function MapQueryToResponse(
  queryFunction: QueryFunctions,
): GetIntradayDto | GetQuoteDto | GetTickerSearchDto {
  const mapper = {
    TIME_SERIES_INTRADAY: GetIntradayDto,
    GLOBAL_QUOTE: GetQuoteDto,
    SYMBOL_SEARCH: GetTickerSearchDto,
  };
  return mapper[queryFunction];
}
