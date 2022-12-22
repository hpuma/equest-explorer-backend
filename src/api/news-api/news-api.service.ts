import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
@Injectable()
export class NewsApiService {
  constructor(private readonly httpService: HttpService) {}
}
