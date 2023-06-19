import { Document, Schema } from 'mongoose';

export interface TickerValue extends Document {
  readonly symbol: string;
  readonly name: string;
}

export const TickerValueSchema = new Schema({
  symbol: String,
  name: String,
});
export const TICKER_VALUE = 'TICKERVALUE_MODEL';
