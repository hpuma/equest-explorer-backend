import { Article, NewsResource } from '@global/newsresource.class';
import { GetBingResponseDto, NewsArticle } from '../api/dto/get-response.dto';
import { MappedTimestamp } from '@global/response/news-response.dto';

class MappedArticle extends Article {
  constructor({
    provider,
    name: title,
    description,
    url,
    image,
    datePublished,
  }: NewsArticle) {
    const timestamp = new MappedTimestamp(datePublished);
    const urlToImage = image?.thumbnail?.contentUrl ?? '';

    super({
      author: provider[0].name,
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
  constructor(data: GetBingResponseDto) {
    const articles = data?.value ?? [];
    super({
      articles: articles.map((article) => new MappedArticle(article)),
      count: articles.length,
    });
  }
}
