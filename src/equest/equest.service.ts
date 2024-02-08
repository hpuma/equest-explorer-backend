import { FilterQuery, Model, ProjectionType } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ApiKey, API_KEY } from '@database/models/apikey.model';
import { NewsRecord, NEWS_RECORD } from '@database/models/newsrecord.model';
import { TickerValue, TICKER_VALUE } from '@database/models/tickervalue.model';
import { TickerQuote, TICKER_QUOTE } from '@database/models/tickerquote.model';
import { v4 as uuidv4 } from 'uuid';
import { Article } from '@global/response/newsresource.class';

@Injectable()
export class EquestService {
  constructor(
    @Inject(API_KEY)
    private apiKey: Model<ApiKey>,
    @Inject(NEWS_RECORD)
    private newsRecord: Model<NewsRecord>,
    @Inject(TICKER_VALUE)
    private tickerValue: Model<TickerValue>,
    @Inject(TICKER_QUOTE)
    private tickerQuote: Model<TickerQuote>,
  ) {}
  async createNewsRecords(articles: Article[]) {
    const { acknowledged = false, insertedCount = 0 } =
      await this.newsRecord.insertMany(articles, {
        rawResult: true,
      });

    return { acknowledged, insertedCount };
  }
  async getNewsRecordDuplicates(hashes: string[]) {
    const response = await this.newsRecord.find(
      { hash: hashes },
      { _id: 0, hash: 1 },
    );

    return response.map((data) => data.hash);
  }
  async getNewsRecords(
    query: FilterQuery<any>,
    projection: ProjectionType<any> | null | undefined,
  ) {
    return await this.newsRecord.find(query, projection);
  }
  async getTickerValues(tickerValue: string) {
    try {
      return await this.tickerValue.aggregate([
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
  }
  async getTickerRecords() {
    return await this.tickerValue.find({ isActive: true }, { _id: 0 }).lean();
  }
  async createApiKey(email: string) {
    const apikeyWithEmail = await this.apiKey.findOne({ email }).lean();
    if (apikeyWithEmail) throw Error('Api Key already assigned to email!');

    const generatedKey = uuidv4();
    const { key } = await this.apiKey.create({
      email,
      key: generatedKey,
    });
    return { key };
  }
  async createTickerQuote(data: any) {
    const timeThreshold = new Date(); // Time now
    timeThreshold.setHours(timeThreshold.getHours() - 1); // Set time an hour back
    return (
      (await this.tickerQuote
        .findOne({
          symbol: data.symbol,
          createdAt: { $gte: timeThreshold },
        })
        .lean()) ?? (await this.tickerQuote.create(data)).toJSON()
    );
  }
  async getTickerQuote(symbol: string) {
    return await this.tickerQuote
      .findOne({ symbol }, {}, { sort: { createdAt: -1 } })
      .lean();
  }
}
