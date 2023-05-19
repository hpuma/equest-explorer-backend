import { Module } from '@nestjs/common';
import * as mongoose from 'mongoose';

const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: (): Promise<typeof mongoose> =>
    mongoose.connect(process.env.MONGODB_URI),
};

@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
