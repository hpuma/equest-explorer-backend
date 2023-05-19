import { Connection } from 'mongoose';
import { TickerValueSchema } from './tickervalue.schema';

export const tickerValueProviders = [
  {
    provide: 'TICKERVALUE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('tickervalue', TickerValueSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
