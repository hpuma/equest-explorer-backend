import { IsString } from 'class-validator';
import { Format } from '@alphav/helpers/format.class';
import { GetResponseDto } from '@alphav/api/dto/get-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GlobalQuoteResponseDto {
  constructor(data: GetResponseDto) {
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
    description: 'day opening price',
    example: '117',
  })
  open: string;

  @IsString()
  @ApiProperty({
    description: 'day highest price',
    example: '120',
  })
  high: string;

  @IsString()
  @ApiProperty({
    description: 'day lowest price',
    example: '115',
  })
  low: string;

  @IsString()
  @ApiProperty({
    description: 'latest price',
    example: '115',
  })
  price: string;

  @IsString()
  @ApiProperty({
    description: 'total number of shares traded for the day',
    example: '115',
  })
  volume: string;

  @IsString()
  @ApiProperty({
    description:
      'latest day stock may trade or be closed out before the delivery of the underlying asset or cash settlement must occur',
    example: '2023-04-20',
  })
  latestTradingDay: string;

  @IsString()
  @ApiProperty({
    description: 'price of stock at previous closing day',
    example: '118',
  })
  previousClose: string;

  @IsString()
  @ApiProperty({
    description: 'difference between the price and previousClose',
    example: '-3.0',
  })
  change: string;

  @IsString()
  @ApiProperty({
    description: 'percent difference between the price and previousClose',
    example: '-0.025',
  })
  changePercent: string;
}
