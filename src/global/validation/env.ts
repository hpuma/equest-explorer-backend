import { Expose, plainToInstance } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, validateSync } from 'class-validator';
import { ConsoleLogger } from '@nestjs/common';

class ApiBaseUrls {
  @IsString()
  NEWS_BASE_URL = 'https://newsapi.org/v2';

  @IsString()
  ALPHAV_BASE_URL = 'https://www.alphavantage.co/query';

  @IsString()
  MARKETAUX_BASE_URL = 'https://api.marketaux.com/v1';

  @IsString()
  BING_BASE_URL = 'https://api.bing.microsoft.com/v7.0';

  @IsString()
  NEWSDATA_BASE_URL = 'https://newsdata.io/api/1';

  @IsString()
  GNEWS_BASE_URL = 'https://gnews.io/api/v4';

  @IsString()
  THENEWS_BASE_URL = 'https://api.thenewsapi.com/v1';
}

export class EnvVariables extends ApiBaseUrls {
  @IsString()
  @IsNotEmpty()
  @Expose()
  NODE_ENV: string;

  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  INTEGRATIONS_ENABLED: boolean;

  @IsString()
  @IsNotEmpty()
  @Expose()
  NEWS_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  ALPHAV_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  MARKETAUX_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  BING_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  NEWSDATA_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  GNEWS_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  THENEWS_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  MONGODB_URI: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvVariables, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  const errors = validateSync(validatedConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  new ConsoleLogger(`EnvironmentVariables`).log(`Validated Config...`);
  return validatedConfig;
}
