import { ResponseDto } from '@news/api/dto/get-everything-response.dto';

export function createGetEverythingResponse(
  overrides: ResponseDto | null = {
    status: 'OK',
    totalResults: 0,
    articles: [],
  },
): ResponseDto {
  return overrides;
}
