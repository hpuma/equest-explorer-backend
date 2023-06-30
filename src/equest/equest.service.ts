import { Model, Types } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ApiKey, API_KEY } from '@database/models/apikey.model';
import { NewsRecord, NEWS_RECORD } from '@database/models/newsrecord.model';
import { TickerValue, TICKER_VALUE } from '@database/models/tickervalue.model';
import { v4 as uuidv4 } from 'uuid';
import { Article } from '@global/newsresource.class';

@Injectable()
export class EquestService {
  constructor(
    @Inject(API_KEY)
    private apiKeyModel: Model<ApiKey>,
    @Inject(NEWS_RECORD)
    private newsRecord: Model<NewsRecord>,
    @Inject(TICKER_VALUE)
    private tickerValueModel: Model<TickerValue>,
  ) {}

  async getNewsRecords(ticker: string): Promise<
    Omit<
      NewsRecord & {
        _id: Types.ObjectId;
      },
      never
    >[]
  > {
    return await this.newsRecord.find({ ticker }, { _id: 0 });
  }

  async getNewsRecordByHash(hash: string) {
    return await this.newsRecord.findOne({ hash }, { _id: 0 }).lean();
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
  async createNewsRecords(articles: Article[]) {
    const responseData = await this.newsRecord.insertMany(articles, {
      rawResult: true,
    });

    const { acknowledged = false, insertedCount = 0 } = responseData;

    return { acknowledged, insertedCount };
  }
}
