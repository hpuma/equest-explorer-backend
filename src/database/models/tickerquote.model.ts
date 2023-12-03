import { Document, Schema } from 'mongoose';

export interface TickerQuote extends Document {
  readonly ticker: string;
  readonly newsSource: string;
  readonly hash: string;
}
export const TickerQuoteSchema = new Schema(
  {
    symbol: String,
    open: String,
    high: String,
    low: String,
    price: String,
    volume: String,
    latestTradingDay: String,
    previousClose: String,
    change: String,
    changePercent: String,
  },

  { timestamps: true, versionKey: false },
);
export const TICKER_QUOTE = 'TICKERQUOTE_MODEL';
