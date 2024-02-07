import { Article, NewsResource } from '@global/newsresource.class';
import { GetMarketauxResponseDto, DataItem } from '../api/dto/get-response.dto';
import { MappedTimestamp } from '@global/response/news-response.dto';

class MappedArticle extends Article {
  constructor(rawArticle: DataItem) {
    const {
      source: author,
      title,
      snippet: content,
      description,
      url,
      image_url: urlToImage,
      published_at,
    } = rawArticle;

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
  constructor(data: GetMarketauxResponseDto) {
    const articles = data?.data ?? [];
    super({
      articles: articles.map((article) => new MappedArticle(article)),
      count: articles.length,
    });
  }
}
