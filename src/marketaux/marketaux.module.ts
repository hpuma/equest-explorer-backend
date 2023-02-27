import { Module } from '@nestjs/common';
import { MarketauxService } from './marketaux.service';
import { MarketauxController } from './marketaux.controller';

@Module({
  providers: [MarketauxService],
  controllers: [MarketauxController]
})
export class MarketauxModule {}
