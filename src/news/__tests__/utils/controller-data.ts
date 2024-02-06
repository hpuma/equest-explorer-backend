import { NewsQueryDto, NewsResponseDto } from '@news/dto';

export function createEverythingQuery(
  overrides: NewsQueryDto | null = { ticker: 'SPY' },
): NewsQueryDto {
  return overrides;
}

export function createEverythingResponse(
  overrides: NewsResponseDto | null = { articles: [], count: 2 },
): NewsResponseDto {
  return overrides;
}
