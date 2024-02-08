import { Module } from '@nestjs/common';
import { GlobalValidator } from './validation/validator.class';
@Module({
  providers: [GlobalValidator],
  exports: [GlobalValidator],
})
export class GlobalModule {}
