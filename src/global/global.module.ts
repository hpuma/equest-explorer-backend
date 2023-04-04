import { Module } from '@nestjs/common';
import { GlobalValidator } from './global-validator.class';

@Module({
  providers: [GlobalValidator],
  exports: [GlobalValidator],
})
export class GlobalModule {}
