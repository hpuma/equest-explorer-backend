import { Module } from '@nestjs/common';
import { MarketauxService } from './marketaux.service';
import { MarketauxController } from './marketaux.controller';
import { MarketauxApiService } from './api/marketaux-api.service';

@Module({
  controllers: [MarketauxController],
  providers: [MarketauxService, MarketauxApiService],
})
export class MarketauxModule {}
