import { Controller, Get } from '@nestjs/common';
import { BingService } from './bing.service';

@Controller('bing')
export class BingController {
  constructor(private readonly bingService: BingService) {}

  @Get()
  find() {
    return this.bingService.findAll();
  }
}
