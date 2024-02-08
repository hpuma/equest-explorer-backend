import { Article, NewsResource } from '@global/newsresource.class';
import {
  Article as RawArticle,
  GetResponseDto,
} from '@news/api/dto/get-response.dto';
import { MappedTimestamp } from '@global/response/news-response.dto';

class MappedArticle extends Article {
  constructor(rawArticle: RawArticle) {
    const timestamp = new MappedTimestamp(rawArticle.publishedAt);
    delete rawArticle.source;
    super({ ...rawArticle, timestamp });
  }
}

export class NewsResponseDto extends NewsResource {
  constructor(data: GetResponseDto) {
    const articles = data?.articles ?? [];
    super({
      articles: articles.map((article) => new MappedArticle(article)),
      count: articles.length,
    });
  }
}
