import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { TheNewsService } from './thenews.service';
import { NewsQueryDto } from './dto/news-query.dto';
import { NewsResponseDto } from './dto/news-response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GlobalValidator } from '@global/validation/validator.class';

@Controller('thenews')
export class TheNewsController {
  constructor(
    private readonly theNewsService: TheNewsService,
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
      const theNewsServiceResponse = await this.theNewsService.getNews(query);

      const data = await this.globalValidator.validate(
        {
          ...theNewsServiceResponse,
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
