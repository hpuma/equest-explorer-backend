import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { EquestService } from './equest.service';
import {
  NewsRecordQueryDto,
  NewsRecordResponseDto,
  CreateApiKeyBodyDto,
  TickerSearchQueryDto,
} from './dto';
import { AuthGuard } from '@global/auth-gaurd.class';

@Controller('equest')
export class EquestController {
  constructor(private readonly equestService: EquestService) {}

  @Get('news-records')
  async newsRecords(
    @Query() { ticker }: NewsRecordQueryDto,
    @Res() res: Response,
  ): Promise<NewsRecordResponseDto> {
    try {
      const articles = await this.equestService.getNewsRecords(ticker);

      const responseData = {
        articles,
        count: articles.length,
      };
      res.json(responseData);
      return responseData;
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  @Get('ticker-search')
  async tickersearch(
    @Query() query: TickerSearchQueryDto,
    @Res() res: Response,
  ): Promise<{ bestMatches: any[] }> {
    try {
      const bestMatches = await this.equestService.tickersearch(query.ticker);
      const responseObject = { bestMatches };

      res.json(responseObject);
      return responseObject;
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  @Post('create-api-key')
  @UseGuards(AuthGuard)
  async createApiKey(
    @Body() body: CreateApiKeyBodyDto,
    @Headers('x-api-key') headers: string,
    @Res() res: Response,
  ): Promise<{ key: string }> {
    try {
      const { key } = await this.equestService.createApiKey(body.email);

      res.json({ key });
      return { key };
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
