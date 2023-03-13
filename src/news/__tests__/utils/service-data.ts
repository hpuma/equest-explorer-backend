import { GetEverythingResponseDto } from '@news/api/dto/get-everything-response.dto';

export function createGetEverythingResponse(
  overrides: GetEverythingResponseDto | null = {
    status: 'OK',
    totalResults: 0,
    articles: [],
  },
): GetEverythingResponseDto {
  return overrides;
}
