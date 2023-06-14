import { ApiKey } from '@database/models/apikeys/apikey.interface';
export type CreateApiKeyResponseDto = Pick<ApiKey, 'key'>;
