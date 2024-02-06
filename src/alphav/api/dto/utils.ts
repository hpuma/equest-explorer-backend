import {
  GetIntradayDto,
  GetQuoteDto,
  GetNewsSentimentDto,
  GetTickerSearchDto,
} from './';
import { ClassConstructor } from 'class-transformer';
export enum QueryFunctions {
  TIME_SERIES_INTRADAY = 'TIME_SERIES_INTRADAY',
  GLOBAL_QUOTE = 'GLOBAL_QUOTE',
  NEWS_SENTIMENT = 'NEWS_SENTIMENT',
  SYMBOL_SEARCH = 'SYMBOL_SEARCH',
}

export type GetAlphavResponseDto =
  | GetIntradayDto
  | GetQuoteDto
  | GetNewsSentimentDto
  | GetTickerSearchDto;

export function MapQueryToResponse(
  queryFunction: QueryFunctions,
): ClassConstructor<GetAlphavResponseDto> {
  const mapper = {
    TIME_SERIES_INTRADAY: GetIntradayDto,
    GLOBAL_QUOTE: GetQuoteDto,
    NEWS_SENTIMENT: GetNewsSentimentDto,
    SYMBOL_SEARCH: GetTickerSearchDto,
  } as GetAlphavResponseDto;

  return mapper[queryFunction];
}
