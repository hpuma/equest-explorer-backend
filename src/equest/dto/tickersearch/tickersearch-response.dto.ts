import { TickerValue } from '@database/models/tickervalue.model';

export class TickerSearchResponseDto {
  bestMatches: TickerValue[] = [];
}
