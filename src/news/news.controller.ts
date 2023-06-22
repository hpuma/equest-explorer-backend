import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { NewsService } from './news.service';
import { GlobalValidator } from '@global/global-validator.class';
import { EverythingQueryDto, EverythingResponseDto } from './dto';
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
    type: EverythingResponseDto,
  })
  async everything(
    @Query() query: EverythingQueryDto,
    @Res() res: Response,
  ): Promise<EverythingResponseDto> {
    try {
      const newsServiceResponse = await this.newsService.getEverything(query);

      const data = await this.globalValidator.validate(
        {
          ...newsServiceResponse,
          ticker: query.ticker,
        },
        EverythingResponseDto,
      );

      res.json(data);
      return data;
    } catch (e) {
      res.json({ message: e.message });
      return null;
    }
  }
}
