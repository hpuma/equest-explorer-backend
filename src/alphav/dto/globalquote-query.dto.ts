import { IsString } from 'class-validator';
export class GlobalQuoteQueryDto {
  constructor(query: GlobalQuoteQueryDto) {
    if (query) Object.assign(this, query);
  }

  @IsString()
  ticker!: string;
}
