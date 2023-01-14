import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { NewsService } from './news.service';
import { EverythingDto } from './dto/everything.dto';
import { EverythingResponseDto } from './dto/everything-response.dto';
import { GlobalValidator } from '@global/validation/global-validator.class';
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async everything(
    @Query() query: EverythingDto,
    @Res() res: Response,
  ): Promise<EverythingResponseDto> {
    try {
      const newsServiceResponse = await this.newsService.getEverything(query);

      const data = await new GlobalValidator<EverythingResponseDto>(
        newsServiceResponse,
        EverythingResponseDto,
      ).validate();

      res.json(data);
      return data;
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
