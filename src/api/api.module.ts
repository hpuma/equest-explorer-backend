import { Module } from '@nestjs/common';
import { NewsApiModule } from './news-api/news-api.module';

@Module({
  imports: [NewsApiModule]
})
export class ApiModule {}
