import { Expose, plainToInstance } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, validateSync } from 'class-validator';
import { ConsoleLogger } from '@nestjs/common';

const ApiBaseUrls = {
  NEWS_BASE_URL: 'https://newsapi.org/v2',
  ALPHAV_BASE_URL: 'https://www.alphavantage.co/query',
  MARKETAUX_BASE_URL: 'https://api.marketaux.com/v1/',
};

class EnvVariables {
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
  NEWS_BASE_URL: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  ALPHAV_BASE_URL: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  MARKETAUX_BASE_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const configWithBaseUrls = { ...config, ...ApiBaseUrls };

  const validatedConfig = plainToInstance(EnvVariables, configWithBaseUrls, {
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
