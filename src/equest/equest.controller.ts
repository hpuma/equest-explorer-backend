import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { EquestService } from './equest.service';
import { NewsResource } from '@global/newsresource.class';
import {
  CreateApiKeyBodyDto,
  CreateApiKeyResponseDto,
  NewsRecordQueryDto,
  NewsRecordUploadDto,
  NewsRecordUploadResponseDto,
  NewsRecordDuplicatesBodyDto,
  NewsRecordDuplicatesResponseDto,
  TickerSearchQueryDto,
  TickerSearchResponseDto,
} from './dto';
import { TickerRecordResponse } from './dto/tickerrecord/tickerrecord-response.dto';

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
      res.json({ acknowledged: false, insertedCount: 0, message: e.message });
    }
  }

  @Post('news-record/duplicates')
  async newsrecordDuplicates(
    @Body() { hashes }: NewsRecordDuplicatesBodyDto,
    @Res() res: Response,
  ): Promise<NewsRecordDuplicatesResponseDto> {
    try {
      const duplicates = await this.equestService.getNewsRecordDuplicates(
        hashes,
      );

      const response = {
        duplicates,
        count: duplicates.length,
      };

      res.json(response);
      return response;
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
      const query = { ticker: { $regex: new RegExp(ticker, 'i') } };
      const projection = { _id: 0 };

      const articles = await this.equestService.getNewsRecords(
        query,
        projection,
      );
      const responseData = {
        articles,
        count: articles.length,
        ticker,
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
  @Get('ticker-records')
  async tickerrecords(@Res() res: Response): Promise<TickerRecordResponse> {
    try {
      const records = await this.equestService.getTickerRecords();
      const responseObject = { records, count: records.length };

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
