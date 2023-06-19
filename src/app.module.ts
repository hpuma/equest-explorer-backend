import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';
import { AlphavModule } from './alphav/alphav.module';
import { MarketauxModule } from './marketaux/marketaux.module';
import { EquestModule } from 'equest/equest.module';
import { validate } from '@global/env/validate';
import { LoggerMiddleware } from 'logger.middleware';
import { AuthGuardModule } from 'auth/auth.guard.module';

@Module({
  imports: [
    AuthGuardModule,
    NewsModule,
    ConfigModule.forRoot({ validate, cache: true }),
    AlphavModule,
    MarketauxModule,
    EquestModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
