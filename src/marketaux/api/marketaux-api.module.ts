import { Module } from '@nestjs/common';
import { MarketauxApiService } from './marketaux-api.service';

@Module({
  providers: [MarketauxApiService],
})
export class ApiModule {}
