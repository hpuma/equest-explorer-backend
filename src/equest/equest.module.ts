import { Module } from '@nestjs/common';
import { EquestController } from './equest.controller';
import { EquestService } from './equest.service';

import { TickerValueProvider } from '@database/models/tickervalues/tickervalue.providers';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EquestController],
  providers: [EquestService, TickerValueProvider],
})
export class EquestModule {}
