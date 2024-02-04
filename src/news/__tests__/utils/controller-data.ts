import { EverythingQueryDto, NewsResponseDto } from '@news/dto';

export function createEverythingQuery(
  overrides: EverythingQueryDto | null = { ticker: 'SPY' },
): EverythingQueryDto {
  return overrides;
}

export function createEverythingResponse(
  overrides: NewsResponseDto | null = { articles: [], count: 2 },
): NewsResponseDto {
  return overrides;
}
