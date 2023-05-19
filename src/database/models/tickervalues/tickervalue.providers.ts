import { Connection } from 'mongoose';
import { TickerValueSchema } from './tickervalue.schema';

export const TickerValueProvider = {
  provide: 'TICKERVALUE_MODEL',
  useFactory: (connection: Connection) =>
    connection.model('tickervalue', TickerValueSchema),
  inject: ['DATABASE_CONNECTION'],
};
