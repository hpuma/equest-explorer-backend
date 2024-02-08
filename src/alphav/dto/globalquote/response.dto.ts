import { IsBoolean, IsString } from 'class-validator';
import { GetQuoteDto } from '@alphav/api/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Format } from '../utils';

export class GlobalQuoteResponseDto {
  constructor(data: GetQuoteDto) {
    if (!data) return;
    const rawGlobalQuote = Format.extractGlobalQuote(data);
    if (!rawGlobalQuote)
      throw new Error('Unable to extract rawMetaGlobalQuote');
    Object.assign(this, Format.globalQuote(rawGlobalQuote));
  }

  @IsString()
  @ApiProperty({
    description: 'stock ticker',
    example: 'IBM',
  })
  symbol: string;

  @IsString()
  @ApiProperty({
    description: 'opening price of the security on the latest trading day',
    example: '117',
  })
  open: string;

  @IsString()
  @ApiProperty({
    description:
      'highest price at which the security was traded on the latest trading day',
    example: '120',
  })
  high: string;

  @IsString()
  @ApiProperty({
    description:
      'lowest price at which the security was traded on the latest trading day',
    example: '115',
  })
  low: string;

  @IsString()
  @ApiProperty({
    description: 'last traded price of the security on the latest trading day',
    example: '115',
  })
  price: string;

  @IsString()
  @ApiProperty({
    description:
      'total number of shares that were traded on the latest trading day',
    example: '74010408',
  })
  volume: string;

  @IsString()
  @ApiProperty({
    description:
      'closing price of the security on the previous trading day in the format "YYYY-MM-DD"',
    example: '2023-04-20',
  })
  latestTradingDay: string;

  @IsString()
  @ApiProperty({
    description: 'closing price of the security on the previous trading day',
    example: '118',
  })
  previousClose: string;

  @IsString()
  @ApiProperty({
    description: 'numeric diff between the price and previousClose',
    example: '-3.0',
  })
  change: string;

  @IsString()
  @ApiProperty({
    description: 'percent diff between the price and previousClose',
    example: '-0.025',
  })
  changePercent: string;

  @IsBoolean()
  apiFail: boolean;
}
