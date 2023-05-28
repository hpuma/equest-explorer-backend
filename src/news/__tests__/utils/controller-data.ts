import { EverythingQueryDto, EverythingResponseDto } from '@news/dto';

export function createEverythingQuery(
  overrides: EverythingQueryDto | null = { ticker: 'SPY' },
): EverythingQueryDto {
  return overrides;
}

export function createEverythingResponse(
  overrides: EverythingResponseDto | null = { articles: [], count: 2 },
): EverythingResponseDto {
  return overrides;
}
