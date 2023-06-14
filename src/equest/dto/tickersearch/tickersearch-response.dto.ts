import { TickerValue } from '@database/models/tickervalues/tickervalue.interface';

export class TickerSearchResponseDto {
  bestMatches: TickerValue[] = [];
}
