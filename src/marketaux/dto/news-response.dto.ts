import { Article, NewsResource } from '@global/newsresource.class';
import { GetResponseDto, DataItem } from '../api/dto/get-response.dto';
import { MappedTimestamp } from '@global/response/news-response.dto';

class MappedArticle extends Article {
  constructor({
    source: author,
    title,
    snippet: content,
    description,
    url,
    image_url: urlToImage,
    published_at,
  }: DataItem) {
    const timestamp = new MappedTimestamp(published_at);

    super({
      author,
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
  constructor(data: GetResponseDto) {
    const articles = data?.data ?? [];
    super({
      articles: articles.map((article) => new MappedArticle(article)),
      count: articles.length,
    });
  }
}
