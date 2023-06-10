import { Document } from 'mongoose';
import { Article } from '@global/newsresource.class';
export interface NewsRecord extends Document, Article {
  readonly ticker: string;
  readonly newsSource: string;
}
