import { IsString } from 'class-validator';
import { Format } from '@alphav/helpers/format.class';
import { GetResponseDto } from '@alphav/api/dto/get-response.dto';

export class GlobalQuoteResponseDto {
  constructor(data: GetResponseDto) {
    if (!data) return;
    const rawGlobalQuote = Format.extractGlobalQuote(data);
    if (!rawGlobalQuote)
      throw new Error('Unable to extract rawMetaGlobalQuote');
    Object.assign(this, Format.globalQuote(rawGlobalQuote));
  }

  @IsString()
  symbol: string;

  @IsString()
  open: string;

  @IsString()
  high: string;

  @IsString()
  low: string;

  @IsString()
  price: string;

  @IsString()
  volume: string;

  @IsString()
  latestTradingDay: string;

  @IsString()
  previousClose: string;

  @IsString()
  change: string;

  @IsString()
  changePercent: string;
}
