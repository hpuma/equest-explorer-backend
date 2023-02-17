import {
  Timeseries as RawTimeseries,
  MetaData as RawMetaData,
} from '@alphav/api/dto/get-intraday-response.dto';
import {
  MetaData,
  Timeseries,
  ChartTimeSeries,
} from '../dto/intraday-response.dto';

class Format {
  static metaData(data: RawMetaData): MetaData {
    return {
      info: data['1. Information'],
      symbol: data['2. Symbol'],
      lastupdated: data['3. Last Refreshed'],
      interval: data['4. Interval'],
      size: data['5. Output Size'],
      timezone: data['6. Time Zone'],
    };
  }

  static interval(data): string {
    return Object.keys(data)[0];
  }

  static timeseries(data: RawTimeseries): Timeseries {
    const timeseries = Object.values(data)[0];
    const mappedTimeSeries = {} as Timeseries;
    Object.entries(timeseries).forEach(([key, timeseries_data]) => {
      mappedTimeSeries[key] = {
        open: timeseries_data['1. open'],
        high: timeseries_data['2. high'],
        low: timeseries_data['3. low'],
        close: timeseries_data['4. close'],
        volume: timeseries_data['5. volume'],
      };
    });
    return mappedTimeSeries;
  }

  static chartTimeSeries(data: RawTimeseries): ChartTimeSeries {
    const timeseries = Object.values(data)[0];
    const mappedChartTimeSeries = [] as any;

    Object.entries(timeseries).forEach(([key, timeseries_data]) => {
      mappedChartTimeSeries.push({
        x: new Date(key).toLocaleTimeString(),
        y: [
          Number(timeseries_data['1. open']),
          Number(timeseries_data['2. high']),
          Number(timeseries_data['3. low']),
          Number(timeseries_data['4. close']),
        ],
      });
    });
    return mappedChartTimeSeries;
  }

  // Extractors
  static extractMetadata(data) {
    return data['Meta Data'];
  }

  static extractTimeseries(data) {
    if (!data) return null;
    const numMinutes = ['1', '5', '15', '30', '60'];
    const keyName = ['one', 'five', 'fifteen', 'thirty', 'sixty'];
    let index = 0;
    while (index < numMinutes.length) {
      const timeseriesData = data[`Time Series (${numMinutes[index]}min)`];
      if (timeseriesData) return { [keyName[index]]: timeseriesData };
      index++;
    }
    return null;
  }
}

export { Format };
