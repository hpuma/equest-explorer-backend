import {
  Article,
  NewsResource,
  Interval,
  Timestamp,
} from '@global/newsresource.class';
import { GetMarketauxResponseDto, DataItem } from '../api/dto/get-response.dto';
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
    const date = Format.stringToDate(publishedAt);
    super({
      date: Format.date(date),
      time: Format.time(date),
      interval: new MappedInterval(date),
    });
  }
}

class MappedArticle extends Article {
  constructor(rawArticle: DataItem) {
    const {
      source,
      title,
      snippet,
      description,
      url,
      image_url,
      published_at,
    } = rawArticle;

    const timestamp = new MappedTimestamp(published_at);

    super({
      author: source,
      title,
      description,
      url,
      timestamp,
      urlToImage: image_url,
      content: snippet,
    });
  }
}

export class NewsResponseDto extends NewsResource {
  constructor(
    { data, ticker }: GetMarketauxResponseDto & { ticker: string } = {
      meta: { found: 0, returned: 0, limit: 0, page: 0 },
      data: [],
      ticker: 'NO_TICKER',
    },
  ) {
    super({
      articles: data.map((dataItem) => new MappedArticle(dataItem)),
      count: data.length,
      ticker,
    });
  }
}
