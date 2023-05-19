import { Module } from '@nestjs/common';
import * as mongoose from 'mongoose';

const DatabaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: (): Promise<typeof mongoose> =>
    mongoose.connect(process.env.MONGODB_URI),
};

@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
