import { ApiKey } from '@database/models/apikey.model';
export type CreateApiKeyResponseDto = Pick<ApiKey, 'key'>;
