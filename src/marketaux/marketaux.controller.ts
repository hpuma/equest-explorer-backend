import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { MarketauxService } from './marketaux.service';
import { GlobalValidator } from '@global/global-validator.class';
import { NewsQueryDto } from './dto/get-query.dto';
import { ApiResponse } from '@nestjs/swagger';
import { NewsResponseDto } from './dto/news-response.dto';

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
  async news(
    @Query() query: NewsQueryDto,
    @Res() res: Response,
  ): Promise<NewsResponseDto> {
    try {
      const marketauxServiceResponse = await this.marketauxService.getNews(
        query,
      );

      const data = await this.globalValidator.validate(
        {
          ...marketauxServiceResponse,
          ticker: query.ticker,
        },
        NewsResponseDto,
      );

      res.json(data);
      return data;
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
