import { Document } from 'mongoose';

export interface ApiKey extends Document {
  readonly email: string;
  readonly key: string;
}
