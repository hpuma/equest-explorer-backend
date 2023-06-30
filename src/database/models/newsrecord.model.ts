import { Document, Schema } from 'mongoose';
import { Article } from '@global/newsresource.class';

export interface NewsRecord extends Document, Article {
  readonly ticker: string;
  readonly newsSource: string;
  readonly hash: string;
}
export const NewsRecordSchema = new Schema(
  {
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
    newsSource: {
      required: true,
      type: String,
    },
    hash: {
      required: true,
      type: String,
      unique: true,
    },
  },
  { versionKey: false },
);
export const NEWS_RECORD = 'NEWSRECORD_MODEL';
