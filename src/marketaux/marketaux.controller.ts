import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { MarketauxService } from './marketaux.service';
import { GlobalValidator } from '@global/validation/validator.class';
import { NewsQueryDto } from './dto/news-query.dto';
import { NewsResponseDto } from './dto/news-response.dto';
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
    type: NewsResponseDto,
  })
  async news(@Query() query: NewsQueryDto, @Res() res: Response) {
    try {
      const marketauxServiceResponse = await this.marketauxService.getNews(
        query,
      );

      const data = await this.globalValidator.validate(
        marketauxServiceResponse,
        NewsResponseDto,
      );

      res.json({ ...data, ticker: query.ticker });
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
