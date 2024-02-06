import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { EquestService } from './equest.service';
import {
  CreateApiKeyBodyDto,
  CreateApiKeyResponseDto,
  NewsRecordQueryDto,
  NewsRecordUploadDto,
  NewsRecordDuplicatesBodyDto,
  NewsRecordUploadResponseDto,
  NewsRecordDuplicatesResponseDto,
  TickerSearchQueryDto,
  TickerSearchResponseDto,
  TickerRecordResponse,
} from './dto';
import { NewsResource } from '@global/newsresource.class';

@Controller('equest')
export class EquestController {
  constructor(private readonly equestService: EquestService) {}

  @Post('news-record/upload')
  async newsrecordupload(
    @Body() body: NewsRecordUploadDto,
    @Res() res: Response,
  ) {
    try {
      const { articles } = body;
      const response: NewsRecordUploadResponseDto =
        await this.equestService.createNewsRecords(articles);
      res.json(response);
    } catch (e) {
      res.json({ acknowledged: false, insertedCount: 0, message: e.message });
    }
  }
  @Post('news-record/duplicates')
  async newsrecordDuplicates(
    @Body() { hashes }: NewsRecordDuplicatesBodyDto,
    @Res() res: Response,
  ) {
    try {
      const duplicates = await this.equestService.getNewsRecordDuplicates(
        hashes,
      );
      const response: NewsRecordDuplicatesResponseDto = {
        duplicates,
        count: duplicates.length,
      };
      res.json(response);
    } catch (e) {
      res.json({ message: e.message });
    }
  }
  @Get('news-records')
  async newsrecords(
    @Query() { ticker }: NewsRecordQueryDto,
    @Res() res: Response,
  ) {
    try {
      const query = { ticker: { $regex: new RegExp(ticker, 'i') } };
      const projection = { _id: 0 };
      const articles = await this.equestService.getNewsRecords(
        query,
        projection,
      );
      const response: NewsResource = {
        articles,
        count: articles.length,
        ticker,
      };
      res.json(response);
    } catch (e) {
      res.json({ message: e.message });
    }
  }
  @Get('ticker-search')
  async tickersearch(
    @Query() { ticker }: TickerSearchQueryDto,
    @Res() res: Response,
  ) {
    try {
      const bestMatches = await this.equestService.getTickerValues(ticker);
      const response: TickerSearchResponseDto = { bestMatches };
      res.json(response);
    } catch (e) {
      res.json({ message: e.message });
    }
  }
  @Get('ticker-records')
  async tickerrecords(@Res() res: Response) {
    try {
      const records = await this.equestService.getTickerRecords();
      const response: TickerRecordResponse = { records, count: records.length };
      res.json(response);
    } catch (e) {
      res.json({ message: e.message });
    }
  }
  @Post('create-api-key')
  async createApiKey(
    @Body() { email }: CreateApiKeyBodyDto,
    @Res() res: Response,
  ) {
    try {
      const { key }: CreateApiKeyResponseDto =
        await this.equestService.createApiKey(email);
      res.json({ key });
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
