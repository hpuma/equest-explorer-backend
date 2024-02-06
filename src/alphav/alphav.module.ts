import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AlphavService } from './alphav.service';
import { AlphavApiService } from './api/alphav-api.service';
import { EquestService } from 'equest/equest.service';
import { AlphavController } from './alphav.controller';
import { EquestModule } from 'equest/equest.module';
import { GlobalModule } from '@global/global.module';
@Module({
  imports: [
    GlobalModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        baseURL: config
          .get('ALPHAV_BASE_URL')
          .concat(`?apikey=${config.get('ALPHAV_API_KEY')}`),
      }),
      inject: [ConfigService],
    }),
    EquestModule,
  ],
  controllers: [AlphavController],
  providers: [AlphavService, AlphavApiService, EquestService],
})
export class AlphavModule {}
