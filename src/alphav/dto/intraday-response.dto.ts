import { IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { Format } from '@alphav/helpers/format.class';
import { GetResponseDto } from '@alphav/api/dto/get-response.dto';

export class ChartTimeSeries {
  @IsString()
  x!: Date;

  y!: number[];
}

export class MetaData {
  @IsString()
  info: string;

  @IsString()
  symbol: string;

  @IsString()
  lastupdated: string;

  @IsString()
  interval: string;

  @IsString()
  size: string;

  @IsString()
  timezone: string;
}

export class Timeseries {
  [key: string]: {
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  };
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
  metadata: MetaData;

  @IsString()
  interval: string;

  @ValidateNested()
  @Type(() => Timeseries)
  timeseries: Timeseries;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChartTimeSeries)
  chartTimeSeries: ChartTimeSeries[];
}
