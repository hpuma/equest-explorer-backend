import { Module } from '@nestjs/common';
import { connect, Connection } from 'mongoose';
import { ApiKeySchema, API_KEY } from './models/apikey.model';
import { NewsRecordSchema, NEWS_RECORD } from './models/newsrecord.model';
import { TickerValueSchema, TICKER_VALUE } from './models/tickervalue.model';
import { TickerQuoteSchema, TICKER_QUOTE } from './models/tickerquote.model';

const DB_CONNECTION = 'DATABASE_CONNECTION';
const getSchemaName = (modelName: string) => modelName.split('_')[0];
// Set up db model here
const DatabaseSources = {
  [API_KEY]: ApiKeySchema,
  [NEWS_RECORD]: NewsRecordSchema,
  [TICKER_VALUE]: TickerValueSchema,
  [TICKER_QUOTE]: TickerQuoteSchema,
};

function createDatabaseProviders() {
  const collections = Object.keys(DatabaseSources);
  return collections.map((collection) => ({
    provide: collection,
    useFactory: (connection: Connection) =>
      connection.model(getSchemaName(collection), DatabaseSources[collection]),
    inject: [DB_CONNECTION],
  }));
}

const DatabaseProviders = [
  {
    provide: DB_CONNECTION,
    useFactory: () => connect(process.env.MONGODB_URI),
  },
  ...createDatabaseProviders(),
];

@Module({
  providers: DatabaseProviders,
  exports: DatabaseProviders,
})
export class DatabaseModule {}
