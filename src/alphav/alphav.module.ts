import { Module } from '@nestjs/common';
import { AlphavService } from './alphav.service';
import { AlphavController } from './alphav.controller';
import { AlphavApiService } from './api/alphav-api.service';

@Module({
  controllers: [AlphavController],
  providers: [AlphavService, AlphavApiService],
})
export class AlphavModule {}
