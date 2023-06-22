import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { EquestService } from './equest.service';
import { Article, NewsResource } from '@global/newsresource.class';
import {
  CreateApiKeyBodyDto,
  CreateApiKeyResponseDto,
  NewsRecordQueryDto,
  NewsRecordUploadDto,
  NewsRecordUploadResponseDto,
  TickerSearchQueryDto,
  TickerSearchResponseDto,
} from './dto';

@Controller('equest')
export class EquestController {
  constructor(private readonly equestService: EquestService) {}

  @Post('news-record/upload')
  async newsrecordupload(
    @Body() body: NewsRecordUploadDto,
    @Res() res: Response,
  ): Promise<NewsRecordUploadResponseDto> {
    try {
      const { articles } = body;
      const response = await this.equestService.createNewsRecords(articles);

      res.json(response);
      return response;
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  @Get('news-record/:hash')
  async newsrecord(
    @Param('hash') hash: string,
    @Res() res: Response,
  ): Promise<Article> {
    try {
      const article = await this.equestService.getNewsRecordByHash(hash);

      res.json(article);
      return article;
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  @Get('news-records')
  async newsrecords(
    @Query() { ticker }: NewsRecordQueryDto,
    @Res() res: Response,
  ): Promise<NewsResource> {
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
    @Query() { ticker }: TickerSearchQueryDto,
    @Res() res: Response,
  ): Promise<TickerSearchResponseDto> {
    try {
      const bestMatches = await this.equestService.getTickerValues(ticker);
      const responseObject = { bestMatches };

      res.json(responseObject);
      return responseObject;
    } catch (e) {
      res.json({ message: e.message });
    }
  }

  @Post('create-api-key')
  async createApiKey(
    @Body() { email }: CreateApiKeyBodyDto,
    @Res() res: Response,
  ): Promise<CreateApiKeyResponseDto> {
    try {
      const { key } = await this.equestService.createApiKey(email);

      res.json({ key });
      return { key };
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
