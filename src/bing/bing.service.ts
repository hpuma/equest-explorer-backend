import { Injectable } from '@nestjs/common';

@Injectable()
export class BingService {
  findAll() {
    return `This action returns all bing`;
  }
}
