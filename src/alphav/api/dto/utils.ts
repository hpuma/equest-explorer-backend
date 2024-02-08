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

export type GetResponseDto =
  | GetIntradayDto
  | GetQuoteDto
  | GetNewsSentimentDto
  | GetTickerSearchDto;

export function MapQueryToResponse(
  queryFunction: QueryFunctions,
): ClassConstructor<GetResponseDto> {
  const mapper = {
    TIME_SERIES_INTRADAY: GetIntradayDto,
    GLOBAL_QUOTE: GetQuoteDto,
    NEWS_SENTIMENT: GetNewsSentimentDto,
    SYMBOL_SEARCH: GetTickerSearchDto,
  } as GetResponseDto;

  return mapper[queryFunction];
}
