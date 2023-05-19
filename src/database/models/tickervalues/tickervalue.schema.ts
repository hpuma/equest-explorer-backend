import * as mongoose from 'mongoose';

export const TickerValueSchema = new mongoose.Schema({
  symbol: String,
  name: String,
});
