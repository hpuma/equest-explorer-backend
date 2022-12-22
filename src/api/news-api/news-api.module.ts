import { Module } from '@nestjs/common';
import { NewsApiService } from './news-api.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  providers: [NewsApiService],
})
export class NewsApiModule {}
