import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [NewsModule, QuoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
