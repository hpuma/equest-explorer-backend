import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AlphavService } from './alphav.service';
import { GlobalValidator } from '@global/global-validator.class';

import { IntradayQueryDto } from './dto/intraday-query.dto';
import { IntradayResponseDto } from './dto/intraday-response.dto';
import { GlobalQuoteQueryDto } from './dto/globalquote-query.dto';
import { GlobalQuoteResponseDto } from './dto/globalquote-response.dto';
import { TickerSearchQueryDto } from './dto/tickersearch-query.dto';
import { TickerSearchResponseDto } from './dto/tickersearch-response.dto';
import { ApiResponse } from '@nestjs/swagger';
@Controller('alphav')
export class AlphavController {
  constructor(
    private readonly alphavService: AlphavService,
    private readonly globalValidator: GlobalValidator,
  ) {}

  @Get('intraday')
  @ApiResponse({
    status: 200,
    description: 'Intraday response object',
    type: IntradayResponseDto,
  })
  async intraday(
    @Query() query: IntradayQueryDto,
    @Res() res: Response,
  ): Promise<IntradayResponseDto> {
    try {
      const alphaServiceResponse = await this.alphavService.getIntraday(query);

      const data = await this.globalValidator.validate(
        alphaServiceResponse,
        IntradayResponseDto,
      );

      res.json(data);
      return data;
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  @Get('global-quote')
  @ApiResponse({
    status: 200,
    description: 'global-quote response object',
    type: GlobalQuoteResponseDto,
  })
  async globalquote(
    @Query() query: GlobalQuoteQueryDto,
    @Res() res: Response,
  ): Promise<GlobalQuoteResponseDto> {
    try {
      const alphaServiceResponse = await this.alphavService.getGlobalQuote(
        query,
      );

      const data = await this.globalValidator.validate(
        alphaServiceResponse,
        GlobalQuoteResponseDto,
      );

      res.json(data);
      return data;
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  @Get('ticker-search')
  @ApiResponse({
    status: 200,
    description: 'ticker-search response object',
    type: TickerSearchResponseDto,
  })
  async tickersearch(
    @Query() query: TickerSearchQueryDto,
    @Res() res: Response,
  ): Promise<TickerSearchResponseDto> {
    try {
      const alphaServiceResponse = await this.alphavService.getTickerSearch(
        query,
      );

      const data = await this.globalValidator.validate(
        alphaServiceResponse,
        TickerSearchResponseDto,
      );

      res.json(data);
      return data;
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
