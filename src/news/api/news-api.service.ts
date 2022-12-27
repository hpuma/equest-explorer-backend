import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import apisConfig from '../../apis.config';

@Injectable()
export class NewsApiService {
  private apiKey: string;
  constructor(
    private readonly httpService: HttpService,
    @Inject(apisConfig.KEY)
    newsApiConfig: ConfigType<typeof apisConfig>,
  ) {
    httpService.axiosRef.defaults.baseURL = newsApiConfig.newsApiBaseURL;
    this.apiKey = newsApiConfig.newsApiKey;
  }

  getEverything() {
    return 'NEWS-API - GET EVERYTHING';
  }
}
