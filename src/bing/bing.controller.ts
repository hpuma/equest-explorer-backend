import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { BingService } from './bing.service';
import { ApiResponse } from '@nestjs/swagger';
import { GlobalValidator } from '@global/global-validator.class';
import { NewsQueryDto } from './dto/news-query.dto';
import { NewsResponseDto } from './dto/news-response.dto';
@Controller('bing')
export class BingController {
  constructor(
    private readonly bingService: BingService,
    private readonly globalValidator: GlobalValidator,
  ) {}

  @Get('news')
  @ApiResponse({
    status: 200,
    description: 'News response object',
    type: NewsResponseDto,
  })
  async news(@Query() query: NewsQueryDto, @Res() res: Response) {
    try {
      const bingServiceResponse = await this.bingService.getNews(query);

      const data = await this.globalValidator.validate(
        {
          ...bingServiceResponse,
          ticker: query.ticker,
        },
        NewsResponseDto,
      );

      res.json(data);
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
