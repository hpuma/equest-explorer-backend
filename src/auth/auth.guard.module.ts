import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { AuthGuardService } from './auth.guard.service';

@Module({
  imports: [DatabaseModule],
  providers: [AuthGuardService],
})
export class AuthGuardModule {}
