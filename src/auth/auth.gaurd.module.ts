import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { AuthGaurdService } from './auth.gaurd.service';

@Module({
  imports: [DatabaseModule],
  providers: [AuthGaurdService],
})
export class AuthGaurdModule {}
