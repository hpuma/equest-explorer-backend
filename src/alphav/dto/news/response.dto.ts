import {
  NewsSentimentFeed,
  GetNewsSentimentDto,
} from '@alphav/api/dto/get-response.dto';
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
    const date = Format.stringToDate(publishedAt);
    super({
      date: Format.date(date),
      time: Format.time(date),
      interval: new MappedInterval(date),
    });
  }
}

class MappedArticle extends Article {
  constructor(rawArticle: NewsSentimentFeed) {
    const { authors, title, summary, url, banner_image, time_published } =
      rawArticle;

    const timestamp = new MappedTimestamp(time_published);

    super({
      author: authors[0] ?? '',
      title,
      description: summary,
      url,
      timestamp,
      urlToImage: banner_image ?? '',
      content: summary,
    });
  }
}

export class NewsResponseDto extends NewsResource {
  constructor(
    { feed, ticker }: GetNewsSentimentDto & { ticker: string } = {
      items: '',
      sentiment_score_definition: '.',
      relevance_score_definition: '',
      feed: [],
      ticker: 'NO_TICKER',
    },
  ) {
    super({
      articles: feed.map((rawFeedItem) => new MappedArticle(rawFeedItem)),
      count: feed.length,
      ticker,
    });
  }
}
