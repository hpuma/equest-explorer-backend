import {
  NewsResource,
  Article,
  Interval,
  Timestamp,
} from '@global/newsresource.class';
import { Format, Time } from '@global/helpers';
import { GetBingResponseDto, NewsArticle } from '../api/dto/get-response.dto';

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
  constructor(rawArticle: NewsArticle) {
    const {
      provider,
      name: title,
      description,
      url,
      image: { thumbnail: { contentUrl: urlToImage } = {} } = {},
      datePublished,
    } = rawArticle;

    const timestamp = new MappedTimestamp(datePublished);

    super({
      author: provider[0].name,
      title,
      description,
      url,
      timestamp,
      urlToImage,
      content: '*',
    });
  }
}

export class NewsResponseDto extends NewsResource {
  constructor(
    {
      value,
      totalEstimatedMatches,
      ticker,
    }: GetBingResponseDto & { ticker: string } = {
      value: [],
      totalEstimatedMatches: 0,
      ticker: '',
      _type: '',
      readLink: '',
      queryContext: { originalQuery: '', adultIntent: false },
      relatedTopics: {
        relatedNews: {
          about: [],
          category: '',
          clusteredArticles: [],
          contractualRules: [],
          datePublished: '',
          description: '',
          headline: false,
          id: '',
          image: {
            provider: { _type: '', name: '' },
            thumbnail: { contentUrl: '', height: 0, width: 0 },
            url: '',
          },
          mentions: [],
          name: '',
          provider: [{ _type: '', name: '' }],
          url: '',
          video: {
            allowHttpsEmbed: false,
            embedHtml: '',
            motionThumbnailUrl: '',
            name: '',
            thumbnail: { height: 0, width: 0 },
            thumbnailUrl: '',
          },
        },
        name: '',
        webSearchUrl: '',
      },
      sort: [],
      webSearchUrl: '',
    },
  ) {
    super({
      articles: value.map((dataItem) => new MappedArticle(dataItem)),
      count: totalEstimatedMatches,
      ticker,
    });
  }
}
