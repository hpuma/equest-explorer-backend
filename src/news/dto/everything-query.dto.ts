import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
export class EverythingQueryDto {
  @IsString()
  @IsNotEmpty()
  ticker!: string;

  @IsOptional()
  @IsString()
  contentSource?: string;

  @IsOptional()
  @IsString()
  newsSource?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  language?: string;
}
