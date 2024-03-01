import { GetResponseDto } from '@news/api/dto/get-response.dto';

export function createGetEverythingResponse(
  overrides: GetResponseDto | null,
): GetResponseDto {
  return overrides;
}
