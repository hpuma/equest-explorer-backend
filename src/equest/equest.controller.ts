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
import { TickerSearchQueryDto } from './dto/tickersearch-query.dto';
import { CreateApiKeyBodyDto } from './dto/createapikey-body.dto';
import { AuthGuard } from '@global/auth,gaurd';

@Controller('equest')
export class EquestController {
  constructor(private readonly equestService: EquestService) {}

  @Get('ticker-search')
  async tickersearch(
    @Query() query: TickerSearchQueryDto,
    @Res() res: Response,
  ): Promise<any> {
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
  ): Promise<any> {
    try {
      const { key } = await this.equestService.createApiKey(body.email);

      res.json({ key });
      return { key };
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
