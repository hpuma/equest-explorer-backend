import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { tickerApiDoc } from '@global/documentation/query';

export class GlobalQuoteQueryDto {
  constructor(query: GlobalQuoteQueryDto) {
    if (query) Object.assign(this, query);
  }
  @IsNotEmpty()
  @IsString()
  @ApiProperty(tickerApiDoc)
  ticker!: string;
}
