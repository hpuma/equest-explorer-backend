import { Module } from '@nestjs/common';
import { AlphavService } from './alphav.service';
import { AlphavController } from './alphav.controller';
import { AlphavApiService } from './api/alphav-api.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService
          .get('ALPHAV_BASE_URL')
          .concat(`?apikey=${configService.get('ALPHAV_API_KEY')}`),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AlphavController],
  providers: [AlphavService, AlphavApiService],
})
export class AlphavModule {}
