import { Module } from '@nestjs/common';
import { EquestController } from './equest.controller';
import { EquestService } from './equest.service';

import { TickerValueProvider } from '@database/models/tickervalues/tickervalue.provider';
import { ApiKeyProvider } from '@database/models/apikeys/apikey.provider';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EquestController],
  providers: [EquestService, TickerValueProvider, ApiKeyProvider],
})
export class EquestModule {}
