import {
  Article as RawArticle,
  GetEverythingResponseDto,
} from '@news/api/dto/get-everything-response.dto';
import {
  Article,
  NewsResource,
  Interval,
  Timestamp,
} from '@global/news.resource.class';
import Format from './helpers/format.class';
import Time from './helpers/time.class';

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
    super({ ...rawArticle, timestamp });
  }
}

export class EverythingResponseDto extends NewsResource {
  constructor(
    { articles, totalResults }: GetEverythingResponseDto = {
      articles: [],
      totalResults: 0,
      status: 'ok',
    },
  ) {
    super({
      articles: articles.map((rawArticles) => new MappedArticle(rawArticles)),
      count: totalResults,
    });
  }
}
