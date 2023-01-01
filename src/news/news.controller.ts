import { Controller, Get, Query, Res } from '@nestjs/common';
import { NewsService } from './service/news.service';
import { EverythingDto } from './dto/everything.dto';
import { Response } from 'express';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  async everything(@Query() query: EverythingDto, @Res() res: Response) {
    try {
      const data = await this.newsService.getEverything(query);
      res.json({ ...data });
    } catch (e) {
      console.error(e.message);
      res.json({ message: e.message });
    }
  }
}
