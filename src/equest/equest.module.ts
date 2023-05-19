import { Module } from '@nestjs/common';
import { EquestController } from './equest.controller';
import { EquestService } from './equest.service';

import { tickerValueProviders } from '@database/models/tickervalues/tickervalue.providers';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EquestController],
  providers: [EquestService, ...tickerValueProviders],
})
export class EquestModule {}
