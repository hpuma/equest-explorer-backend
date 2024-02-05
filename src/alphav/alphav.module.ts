import { Module } from '@nestjs/common';
import { AlphavService } from './alphav.service';
import { EquestService } from 'equest/equest.service';
import { AlphavController } from './alphav.controller';
import { AlphavApiService } from './api/alphav-api.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GlobalModule } from '@global/global.module';
import { EquestModule } from 'equest/equest.module';
@Module({
  imports: [
    GlobalModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService
          .get('BING_BASE_URL')
          .concat(`?apikey=${configService.get('BING_API_KEY')}`),
      }),
      inject: [ConfigService],
    }),
    EquestModule,
  ],
  controllers: [AlphavController],
  providers: [AlphavService, AlphavApiService, EquestService],
})
export class AlphavModule {}
