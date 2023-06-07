import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { MarketauxService } from './marketaux.service';
import { GlobalValidator } from '@global/global-validator.class';
import { NewsQueryDto } from './dto/get-query.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('marketaux')
export class MarketauxController {
  constructor(
    private readonly marketauxService: MarketauxService,
    private readonly globalValidator: GlobalValidator,
  ) {}

  @Get('news')
  @ApiResponse({
    status: 200,
    description: 'news response object',
    // type: string,
  })
  async news(@Query() query: NewsQueryDto, @Res() res: Response) {
    try {
      const marketauxServiceResponse = await this.marketauxService.getNews(
        query,
      );

      // const data = await this.globalValidator.validate(
      //   alphaServiceResponse,
      //   GlobalQuoteResponseDto,
      // );

      res.json(marketauxServiceResponse);
      return marketauxServiceResponse;
    } catch (e) {
      console.log(
        '🚀 ~ file: marketaux.controller.ts:37 ~ MarketauxController ~ news ~ e:',
        e,
      );
      res.json({ message: e.message });
    }
  }
}
