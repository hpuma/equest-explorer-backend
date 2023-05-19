import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService) => ({
      baseURL: mongoose.connect(configService.get('MONGODB_URI')),
    }),
  },
];
