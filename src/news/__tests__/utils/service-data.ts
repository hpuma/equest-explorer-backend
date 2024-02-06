import { GetNewsResponseDto } from '@news/api/dto/get-everything-response.dto';

export function createGetEverythingResponse(
  overrides: GetNewsResponseDto | null = {
    status: 'OK',
    totalResults: 0,
    articles: [],
  },
): GetNewsResponseDto {
  return overrides;
}
