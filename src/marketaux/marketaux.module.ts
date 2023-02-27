import { Module } from '@nestjs/common';
import { MarketauxService } from './marketaux.service';
import { MarketauxController } from './marketaux.controller';
import { ApiModule } from './api/marketaux-api.module';

@Module({
  providers: [MarketauxService],
  controllers: [MarketauxController],
  imports: [ApiModule],
})
export class MarketauxModule {}
