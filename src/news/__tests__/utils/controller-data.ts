import { NewsQueryDto } from '@news/dto/news-query.dto';
import { NewsResponseDto } from '@news/dto/news-response.dto';

export function createEverythingQuery(
  overrides: NewsQueryDto | null = { ticker: 'SPY' },
): NewsQueryDto {
  return overrides;
}

export function createEverythingResponse(
  overrides: NewsResponseDto | null = { articles: [], count: 2, ticker: 'SPY' },
): NewsResponseDto {
  return overrides;
}
