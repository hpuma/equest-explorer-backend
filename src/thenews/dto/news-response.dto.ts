import { NewsResource } from '@global/response/newsresource.class';
import { Article } from '@global/response/newsresource.class';
import { GetResponseDto, Data } from '../api/dto/get-response.dto';
import { MappedTimestamp } from '@global/response/news-response.dto';

class MappedArticle extends Article {
  constructor({
    source: author,
    title,
    description,
    url,
    image_url: urlToImage,
    published_at: datePublished,
    snippet: content,
  }: Data) {
    const timestamp = new MappedTimestamp(datePublished);

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
