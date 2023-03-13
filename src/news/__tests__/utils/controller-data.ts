import { EverythingQueryDto } from '@news/dto/everything-query.dto';
import { EverythingResponseDto } from '@news/dto/everything-response.dto';

export function createEverythingQueryData(
  overrides: EverythingQueryDto | null = { ticker: 'SPY' },
): EverythingQueryDto {
  return overrides;
}

export function createGlobalValidatorData(
  overrides: EverythingResponseDto | null = { results: [], count: 2 },
): EverythingResponseDto {
  return overrides;
}
