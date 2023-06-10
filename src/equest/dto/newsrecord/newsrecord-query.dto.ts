import { IsString, IsOptional } from 'class-validator';

export class NewsRecordQueryDto {
  @IsString()
  @IsOptional()
  ticker: string;
}
