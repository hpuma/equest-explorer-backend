import { Document } from 'mongoose';

export interface TickerValue extends Document {
  readonly symbol: string;
  readonly name: string;
}
