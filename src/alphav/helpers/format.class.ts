import {
  GetResponseDto,
  Timeseries as RawTimeseries,
  MetaData as RawMetaData,
  GlobalQuote as RawGlobalQuote,
} from '@alphav/api/dto/get-response.dto';
import {
  MetaData,
  Timeseries,
  ChartTimeSeries,
} from '../dto/intraday-response.dto';
import { GlobalQuoteResponseDto } from "@alphav/dto/globalquote-response.dto";

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
    Object.entries(timeseries).forEach(([key, timeseriesData]) => {
      mappedTimeSeries[key] = {
        open: timeseriesData['1. open'],
        high: timeseriesData['2. high'],
        low: timeseriesData['3. low'],
        close: timeseriesData['4. close'],
        volume: timeseriesData['5. volume'],
      };
    });
    return mappedTimeSeries;
  }

  static chartTimeSeries(data: RawTimeseries): ChartTimeSeries {
    const timeseries = Object.values(data)[0];
    const mappedChartTimeSeries = [] as any;

    Object.entries(timeseries).forEach(([key, timeseriesData]) => {
      mappedChartTimeSeries.push({
        x: new Date(key).toLocaleTimeString(),
        y: [
          Number(timeseriesData['1. open']),
          Number(timeseriesData['2. high']),
          Number(timeseriesData['3. low']),
          Number(timeseriesData['4. close']),
        ],
      });
    });
    return mappedChartTimeSeries;
  }


  static globalQuote(data: RawGlobalQuote): GlobalQuoteResponseDto {
    return {
      symbol: data["01. symbol"],
      open: data["02. open"],
      high: data["03. high"],
      low: data["04. low"],
      price: data["05. price"],
      volume: data["06. volume"],
      latestTradingDay: data["07. latest trading day"],
      previousClose: data["08. previous close"],
      change: data["09. change"],
      changePercent: data["10. change percent"]
    };
  }

  // EXTRACTORS
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
  static extractGlobalQuote(data: GetResponseDto): RawGlobalQuote {
    return data['Global Quote']
  }
}

export { Format };
