import { NewsResource } from '@global/response/newsresource.class';
import { Article } from '@global/response/newsresource.class';
import {
  GetResponseDto,
  Article as RawArticle,
} from '../api/dto/get-response.dto';
import { MappedTimestamp } from '@global/response/news-response.dto';
class MappedArticle extends Article {
  constructor({
    source,
    title,
    description,
    url,
    image: urlToImage,
    publishedAt: datePublished,
    content,
  }: RawArticle) {
    const timestamp = new MappedTimestamp(datePublished);

    super({
      author: source ? source.name : '',
      title,
      description,
      url,
      timestamp,
      urlToImage,
      content,
    });
  }
}

export class NewsResponseDto extends NewsResource {
  constructor(
    { articles }: GetResponseDto = { articles: [], totalArticles: 0 },
  ) {
    super({
      articles: articles.map((article) => new MappedArticle(article)),
      count: articles.length,
    });
  }
}
