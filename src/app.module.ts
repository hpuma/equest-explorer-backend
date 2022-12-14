import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { QuoteModule } from './quote/quote.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [NewsModule, QuoteModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
