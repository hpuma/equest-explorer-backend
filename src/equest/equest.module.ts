import { Module } from '@nestjs/common';
import { EquestController } from './equest.controller';
import { EquestService } from './equest.service';
import { DatabaseModule } from '@database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [EquestController],
  providers: [EquestService],
  exports: [EquestService, DatabaseModule],
})
export class EquestModule {}
