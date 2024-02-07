import { Article, NewsResource } from '@global/newsresource.class';
import {
  NewsSentimentFeed,
  GetNewsSentimentDto,
} from '@alphav/api/dto/get-response.dto';
import { MappedTimestamp } from '@global/response/news-response.dto';

class MappedArticle extends Article {
  constructor({
    authors,
    title,
    summary,
    url,
    banner_image: urlToImage,
    time_published,
  }: NewsSentimentFeed) {
    const timestamp = new MappedTimestamp(time_published);

    super({
      author: authors[0] ?? '',
      title,
      description: summary,
      url,
      timestamp,
      urlToImage,
      content: summary,
    });
  }
}

export class NewsResponseDto extends NewsResource {
  constructor(data: GetNewsSentimentDto) {
    const articles = data?.feed ?? [];
    super({
      articles: articles.map((article) => new MappedArticle(article)),
      count: articles.length,
    });
  }
}
