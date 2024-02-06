import {
  Article as RawArticle,
  GetNewsResponseDto,
} from '@news/api/dto/get-everything-response.dto';
import {
  Article,
  NewsResource,
  Interval,
  Timestamp,
} from '@global/newsresource.class';
import { Format, Time } from '@global/helpers';

class MappedInterval extends Interval {
  constructor(date: Date) {
    super({
      plusone: Format.dateString(Time.roundMinute(date, 'up')),
      exact: Format.dateString(date),
      minusone: Format.dateString(Time.roundMinute(date, 'down')),
    });
  }
}

class MappedTimestamp extends Timestamp {
  constructor(publishedAt: string) {
    const date = new Date(publishedAt);
    super({
      date: Format.date(date),
      time: Format.time(date),
      interval: new MappedInterval(date),
    });
  }
}

class MappedArticle extends Article {
  constructor(rawArticle: RawArticle) {
    const timestamp = new MappedTimestamp(rawArticle.publishedAt);
    delete rawArticle.source;
    super({ ...rawArticle, timestamp });
  }
}

export class NewsResponseDto extends NewsResource {
  constructor(
    { articles, ticker }: GetNewsResponseDto & { ticker: string } = {
      articles: [],
      totalResults: 0,
      status: 'ok',
      ticker: 'NO_TICKER',
    },
  ) {
    super({
      articles: articles.map((rawArticles) => new MappedArticle(rawArticles)),
      count: articles.length,
      ticker,
    });
  }
}
