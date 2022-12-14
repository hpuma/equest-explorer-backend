import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { QuoteModule } from './quote/quote.module';
import { HistoryModule } from './history/history.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [NewsModule, QuoteModule, HistoryModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
