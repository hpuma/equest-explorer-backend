import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ApiKey, API_KEY } from '@database/models/apikey.model';

@Injectable()
export class AuthGuardService {
  constructor(
    @Inject(API_KEY)
    private apiKeyModel: Model<ApiKey>,
  ) {}
  async findApiKey(key: string) {
    return await this.apiKeyModel.findOne({ key });
  }
}
