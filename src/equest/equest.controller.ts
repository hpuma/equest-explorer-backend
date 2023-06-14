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
import { NewsResource } from '@global/newsresource.class';
import {
  CreateApiKeyBodyDto,
  CreateApiKeyResponseDto,
  NewsRecordQueryDto,
  TickerSearchQueryDto,
  TickerSearchResponseDto,
} from './dto';
import { AuthGuard } from '@global/auth-gaurd.class';

@Controller('equest')
export class EquestController {
  constructor(private readonly equestService: EquestService) {}

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
  @UseGuards(AuthGuard)
  async createApiKey(
    @Body() { email }: CreateApiKeyBodyDto,
    @Headers('x-api-key') headers: string,
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
