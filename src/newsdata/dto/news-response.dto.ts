import { NewsResource } from '@global/response/newsresource.class';
import { Article } from '@global/response/newsresource.class';
import { GetResponseDto, Result } from '../api/dto/get-response.dto';
import { MappedTimestamp } from '@global/response/news-response.dto';

class MappedArticle extends Article {
  constructor({
    creator,
    title,
    description,
    source_url: url,
    image_url: urlToImage,
    pubDate: datePublished,
  }: Result) {
    const timestamp = new MappedTimestamp(datePublished);

    super({
      author: creator ? creator[0] : '',
      title,
      description,
      url,
      timestamp,
      urlToImage,
      content: '',
    });
  }
}

export class NewsResponseDto extends NewsResource {
  constructor(data: GetResponseDto) {
    const articles = data?.results ?? [];
    super({
      articles: articles.map((article) => new MappedArticle(article)),
      count: articles.length,
    });
  }
}
