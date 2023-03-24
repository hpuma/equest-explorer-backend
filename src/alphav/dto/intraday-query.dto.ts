import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { tickerApiDoc } from '@global/documentation/query';
export class IntradayQueryDto {
  constructor(query: IntradayQueryDto) {
    if (query) Object.assign(this, query);
  }

  @IsString()
  @ApiProperty(tickerApiDoc)
  ticker!: string;

  @IsOptional()
  @IsString()
  interval?: string;

  @IsOptional()
  @IsString()
  datasize?: string;
}
