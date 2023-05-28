import { IsString, ValidateNested, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { GetResponseDto } from '@alphav/api/dto/get-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import Format from '../helpers/format.class';

export class ChartTimeSeries {
  @IsString()
  @ApiProperty({
    description: 'timestamp of stock data',
    example: '8:00:00 PM',
    type: Date,
  })
  x!: Date;

  @IsNumber({}, { each: true })
  @ApiProperty({
    description:
      'listing containing numeric values that represents: open, high, low, current',
    example: [397.02, 397.03, 396.98, 397.01],
    type: [Number],
  })
  y!: number[];
}

export class MetaData {
  @IsString()
  @ApiProperty({
    description:
      'basic description of timeseries data such as interval, O, H, L, C, V',
    example: 'Intraday (1min) open, high, low, close prices and volume',
  })
  info: string;

  @IsString()
  @ApiProperty({
    description: 'stock ticker',
    example: 'IBM',
  })
  symbol: string;

  @IsString()
  @ApiProperty({
    description: 'time stamp of last time data was updated',
    example: '2023-03-27 19:40:00',
  })
  lastupdated: string;

  @IsString()
  @ApiProperty({
    description: 'interval value from request query param',
    example: '1min',
  })
  interval: string;

  @IsString()
  @ApiProperty({
    description: 'datasize value from request query param',
    example: 'Compact',
  })
  size: string;

  @IsString()
  @ApiProperty({
    description: 'data source timezone',
    example: 'US/Eastern',
  })
  timezone: string;
}

export class TimeseriesData {
  @IsString()
  @ApiProperty({ description: 'interval open', example: '117' })
  open: string;

  @IsString()
  @ApiProperty({ description: 'interval high', example: '120' })
  high: string;

  @IsString()
  @ApiProperty({ description: 'interval low', example: '115' })
  low: string;

  @IsString()
  @ApiProperty({ description: 'interval close', example: '119' })
  close: string;

  @IsString()
  @ApiProperty({
    description: 'interval total number of shares traded',
    example: '74010408',
  })
  volume: string;
}
export class Timeseries {
  [key: string]: TimeseriesData;
}

export class IntradayResponseDto {
  constructor(data: GetResponseDto) {
    if (!data) return;

    const rawMetaData = Format.extractMetadata(data);
    if (!rawMetaData) throw new Error('Unable to map rawMetaData');

    const rawTimeSeries = Format.extractTimeseries(data);
    if (!rawTimeSeries) throw new Error('Unable to map rawTimeSeries');

    Object.assign(this, {
      metadata: Format.metaData(rawMetaData),
      interval: Format.interval(rawTimeSeries),
      timeseries: Format.timeseries(rawTimeSeries),
      chartTimeSeries: Format.chartTimeSeries(rawTimeSeries),
    });
  }

  @ValidateNested()
  @Type(() => MetaData)
  @ApiProperty({
    description: '`MetaData` object containing intraday metadata',
  })
  metadata: MetaData;

  @IsString()
  @ApiProperty({
    description: 'aggregate time timeseries field',
    example: '1min',
  })
  interval: string;

  @ValidateNested()
  @Type(() => Timeseries)
  @ApiProperty({
    description: '`Timeseries` object containing data within an interval',
    type: Timeseries,
    isArray: true,
    additionalProperties: { type: 'string' },
  })
  timeseries: Timeseries;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChartTimeSeries)
  @ApiProperty({
    description:
      'List of `ChartTimeSeries` objects within interval, NOTE: need to make optional',
    type: ChartTimeSeries,
    isArray: true,
  })
  chartTimeSeries: ChartTimeSeries[];
}
