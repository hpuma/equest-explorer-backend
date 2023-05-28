import { Connection, Schema } from 'mongoose';

export const TickerValueSchema = new Schema({
  symbol: String,
  name: String,
});

export const TickerValueProvider = {
  provide: 'TICKERVALUE_MODEL',
  useFactory: (connection: Connection) =>
    connection.model('tickervalue', TickerValueSchema),
  inject: ['DATABASE_CONNECTION'],
};
