import { Module } from '@nestjs/common';
import { BingService } from './bing.service';
import { BingController } from './bing.controller';
import { BingApiService } from './api/bing-api.service';
@Module({
  controllers: [BingController],
  providers: [BingService, BingApiService],
})
export class BingModule {}
