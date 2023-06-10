import { Connection, Schema } from 'mongoose';

export const NewsRecordSchema = new Schema({
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String,
  timestamp: {
    date: String,
    time: String,
    interval: {
      plusone: String,
      exact: String,
      minusone: String,
    },
  },
  ticker: String,
  newsSource: String,
});

export const NewsRecordProvider = {
  provide: 'NEWSRECORD_MODEL',
  useFactory: (connection: Connection) =>
    connection.model('newsrecord', NewsRecordSchema),
  inject: ['DATABASE_CONNECTION'],
};
