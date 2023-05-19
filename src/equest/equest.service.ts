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
    const tickerValues = await this.tickerValueModel
      .find({
        symbol: {
          $regex: new RegExp(`^${tickerValue}`, 'i'),
        },
      })
      .limit(5)
      .lean()
      .sort({ symbol: 1 })
      .select({ _id: 0, symbol: 1, name: 1 });

    return tickerValues;
  }
}
