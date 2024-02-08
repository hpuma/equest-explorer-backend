import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GNewsService } from './gnews.service';
import { NewsQueryDto } from './dto/news-query.dto';
import { NewsResponseDto } from './dto/news-response.dto';
import { GlobalValidator } from '@global/global-validator.class';
import { ApiResponse } from '@nestjs/swagger';

@Controller('gnews')
export class GNewsController {
  constructor(
    private readonly gNewsService: GNewsService,
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
      const newsDataServiceResponse = await this.gNewsService.getNews(query);

      const data = await this.globalValidator.validate(
        {
          ...newsDataServiceResponse,
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
