import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';
import { AlphavModule } from './alphav/alphav.module';

import { MarketauxModule } from './marketaux/marketaux.module';

@Module({
  imports: [
    NewsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AlphavModule,
    MarketauxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
