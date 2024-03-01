import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { NewsService } from './news.service';
import { GlobalValidator } from '@global/validation/validator.class';
import { NewsQueryDto } from './dto/news-query.dto';
import { NewsResponseDto } from './dto/news-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly globalValidator: GlobalValidator,
  ) {}

  @Get('everything')
  @ApiResponse({
    status: 200,
    description: 'everything response object',
    type: NewsResponseDto,
  })
  async everything(@Query() query: NewsQueryDto, @Res() res: Response) {
    try {
      const newsServiceResponse = await this.newsService.getNews(query);

      const data = await this.globalValidator.validate(
        newsServiceResponse,
        NewsResponseDto,
      );

      res.json({ ...data, ticker: query.ticker });
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
