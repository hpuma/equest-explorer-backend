import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AlphavService } from './alphav.service';
import { GlobalValidator } from '@global/validation/global-validator.class';

import { IntradayQueryDto } from './dto/intraday-query.dto';
import { IntradayResponseDto } from './dto/intraday-response.dto';

@Controller('alphav')
export class AlphavController {
  constructor(private readonly alphavService: AlphavService) {}

  @Get('intraday')
  async intraday(
    @Query() query: IntradayQueryDto,
    @Res() res: Response,
  ): Promise<IntradayResponseDto> {
    try {
      const alphaServiceResponse = await this.alphavService.getIntraday(query);

      const data = await new GlobalValidator<IntradayResponseDto>(
        alphaServiceResponse,
        IntradayResponseDto,
      ).validate();

      res.json(data);
      return data;
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
