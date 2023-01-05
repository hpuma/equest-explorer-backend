import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { NewsService } from './news.service';
import { EverythingDto } from './dto/everything.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  async everything(@Query() query: EverythingDto, @Res() res: Response) {
    try {
      const data = await this.newsService.getEverything(query);

      res.json(data);
    } catch (e) {
      res.json({ message: e.message });
    }
  }
}
