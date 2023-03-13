import { EverythingQueryDto } from '@news/dto/everything-query.dto';
import { EverythingResponseDto } from '@news/dto/everything-response.dto';

export function createEverythingQuery(
  overrides: EverythingQueryDto | null = { ticker: 'SPY' },
): EverythingQueryDto {
  return overrides;
}

export function createEverythingResponse(
  overrides: EverythingResponseDto | null = { results: [], count: 2 },
): EverythingResponseDto {
  return overrides;
}
