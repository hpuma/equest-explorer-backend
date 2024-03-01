import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AlphavService } from './alphav.service';
import { GlobalValidator } from '@global/validation/validator.class';
import {
  IntradayQueryDto,
  GlobalQuoteQueryDto,
  IntradayResponseDto,
  NewsQueryDto,
  GlobalQuoteResponseDto,
  NewsResponseDto,
} from './dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('alphav')
export class AlphavController {
  constructor(
    private readonly alphavService: AlphavService,
    private readonly globalValidator: GlobalValidator,
  ) {}

  @Get('global-quote')
  @ApiResponse({
    status: 200,
    description: 'global-quote response object',
    type: GlobalQuoteResponseDto,
  })
  async globalquote(@Query() query: GlobalQuoteQueryDto, @Res() res: Response) {
    try {
      const alphaServiceResponse = await this.alphavService.getGlobalQuote(
        query,
      );
      const globalQuoteData = await this.globalValidator.validate(
        alphaServiceResponse,
        GlobalQuoteResponseDto,
      );

      res.json(globalQuoteData);
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  @Get('intraday')
  @ApiResponse({
    status: 200,
    description: 'Intraday response object',
    type: IntradayResponseDto,
  })
  async intraday(@Query() query: IntradayQueryDto, @Res() res: Response) {
    try {
      const alphaServiceResponse = await this.alphavService.getIntraday(query);
      const data = await this.globalValidator.validate(
        alphaServiceResponse,
        IntradayResponseDto,
      );
      res.json(data);
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  @Get('news')
  @ApiResponse({
    status: 200,
    description: 'News response object',
    type: NewsResponseDto,
  })
  async news(@Query() query: NewsQueryDto, @Res() res: Response) {
    try {
      const alphaServiceResponse = await this.alphavService.getNews(query);
      const data = await this.globalValidator.validate(
        alphaServiceResponse,
        NewsResponseDto,
      );
      res.json({ ...data, ticker: query.ticker });
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
