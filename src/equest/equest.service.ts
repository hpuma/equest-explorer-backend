import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { TickerValue } from '@database/models/tickervalues/tickervalue.interface';
import { ApiKey } from '@database/models/apikeys/apikey.interface';
import { NewsRecord } from '@database/models/newsrecords/newsrecord.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EquestService {
  constructor(
    @Inject('TICKERVALUE_MODEL')
    private tickerValueModel: Model<TickerValue>,
    @Inject('APIKEY_MODEL')
    private apiKeyModel: Model<ApiKey>,
    @Inject('NEWSRECORD_MODEL')
    private newsRecord: Model<NewsRecord>,
  ) {}

  async getNewsRecords(ticker: string) {
    return await this.newsRecord.find({ ticker }, { _id: 0 });
  }

  async getTickerValues(tickerValue: string): Promise<TickerValue[]> {
    let tickerValues: TickerValue[] = [];

    try {
      tickerValues = await this.tickerValueModel.aggregate([
        {
          $search: {
            index: 'symbol_text',
            text: {
              query: tickerValue,
              path: {
                wildcard: '*',
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            symbol: 1,
            name: 1,
            score: { $meta: 'searchScore' },
          },
        },
      ]);
    } catch (error) {
      console.log(error.message);
    }

    return tickerValues;
  }

  async createApiKey(email: string): Promise<Pick<ApiKey, 'key'>> {
    const apikeyWithEmail = await this.apiKeyModel.findOne({ email }).lean();
    if (apikeyWithEmail) throw Error('Api Key already assigned to email!');

    const generatedKey = uuidv4();
    const { key } = await this.apiKeyModel.create({
      email,
      key: generatedKey,
    });

    return { key };
  }
}
