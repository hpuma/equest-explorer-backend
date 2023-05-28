import { Connection, Schema } from 'mongoose';

export const ApiKeySchema = new Schema({
  email: String,
  key: String,
});

export const ApiKeyProvider = {
  provide: 'APIKEY_MODEL',
  useFactory: (connection: Connection) =>
    connection.model('apikey', ApiKeySchema),
  inject: ['DATABASE_CONNECTION'],
};
