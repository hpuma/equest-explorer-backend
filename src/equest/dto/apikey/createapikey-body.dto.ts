import { IsEmail } from 'class-validator';

export class CreateApiKeyBodyDto {
  constructor(query: CreateApiKeyBodyDto) {
    if (query) Object.assign(this, query);
  }

  @IsEmail()
  email: string;
}
