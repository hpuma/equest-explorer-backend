import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { EquestService } from './equest.service';
import { TickerSearchQueryDto } from './dto/tickersearch-query.dto';

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
}
