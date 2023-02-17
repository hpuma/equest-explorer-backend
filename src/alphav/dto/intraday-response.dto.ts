class Timeseries {}

class Metadata {}

export class IntradayResponseDto {
  metadata: Metadata;
  interval: string;
  timeseries: Timeseries;
  chartTimeSeries: any;
}
