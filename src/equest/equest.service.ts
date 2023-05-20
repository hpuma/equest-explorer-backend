import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { TickerValue } from '@database/models/tickervalues/tickervalue.interface';

@Injectable()
export class EquestService {
  constructor(
    @Inject('TICKERVALUE_MODEL')
    private tickerValueModel: Model<TickerValue>,
  ) {}

  async tickersearch(tickerValue: string): Promise<any[]> {
    let tickerValues = [];

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
}
