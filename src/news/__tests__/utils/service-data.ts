import { GetResponseDto } from '@news/api/dto/get-response.dto';

export function createGetEverythingResponse(
  overrides: GetResponseDto | null = {
    status: 'OK',
    totalResults: 0,
    articles: [],
  },
): GetResponseDto {
  return overrides;
}
