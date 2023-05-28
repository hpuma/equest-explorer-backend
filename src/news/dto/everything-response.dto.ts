import { Format } from '../helpers/format.class';
import { Time } from '../helpers/time.class';
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
class MappedInterval extends Interval {
  constructor(date: Date) {
    if (!date) return;
    super({
      plusone: Format.dateString(Time.roundMinute(date, 'up')),
      exact: Format.dateString(date),
      minusone: Format.dateString(Time.roundMinute(date, 'down')),
    });
  }
}

class MappedTimestamp extends Timestamp {
  constructor(publishedAt: string) {
    if (!publishedAt) return;
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
    if (!rawArticle) return;
    const timestamp = new MappedTimestamp(rawArticle.publishedAt);
    super({ ...rawArticle, timestamp });
  }
}

export class EverythingResponseDto extends NewsResource {
  constructor(data: GetEverythingResponseDto) {
    if (!data) return;
    super({
      articles: data.articles.map(
        (rawArticles) => new MappedArticle(rawArticles),
      ),
      count: data.totalResults,
    });
  }
}
