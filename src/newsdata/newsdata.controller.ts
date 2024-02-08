import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { NewsDataService } from './newsdata.service';
import { NewsQueryDto } from './dto/news-query.dto';
import { NewsResponseDto } from './dto/news-response.dto';
import { GlobalValidator } from '@global/validation/validator.class';
import { ApiResponse } from '@nestjs/swagger';

@Controller('newsdata')
export class NewsDataController {
  constructor(
    private readonly newsDataService: NewsDataService,
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
      const newsDataServiceResponse = await this.newsDataService.getNews(query);

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
