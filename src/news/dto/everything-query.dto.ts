import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { tickerApiDoc } from '@global/documentation/query';
export class EverythingQueryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty(tickerApiDoc)
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
