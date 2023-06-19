import { Document, Schema } from 'mongoose';

export const ApiKeySchema = new Schema({
  email: String,
  key: String,
});

export interface ApiKey extends Document {
  readonly email: string;
  readonly key: string;
}
export const API_KEY = 'APIKEY_MODEL';
