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
  @ApiProperty({
    description:
      'Time interval between two consecutive data points in the time series.',
    enum: ['1min', '5min', '15min', '30min', '60min'],
  })
  interval?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: `compact returns only the latest 100 data points in the intraday time series; 
      full returns the full-length intraday time series;
      The "compact" option is recommended if you would like to reduce the data size of each API call. `,
    enum: ['compact', 'full'],
  })
  datasize?: string;
}
