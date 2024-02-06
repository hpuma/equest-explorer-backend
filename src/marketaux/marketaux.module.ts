import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MarketauxService } from './marketaux.service';
import { MarketauxApiService } from './api/marketaux-api.service';
import { MarketauxController } from './marketaux.controller';
import { GlobalModule } from '@global/global.module';
@Module({
  imports: [
    GlobalModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('MARKETAUX_BASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MarketauxController],
  providers: [MarketauxService, MarketauxApiService, ConfigService],
})
export class MarketauxModule {}
