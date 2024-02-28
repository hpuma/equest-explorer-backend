import { Interval, Timestamp } from '@global/response/newsresource.class';
import { Format } from '@global/helpers';

class MappedInterval extends Interval {
  constructor(formatter: Format) {
    super({
      plusone: formatter.formattedDateString('plusone'),
      exact: formatter.formattedDateString(),
      minusone: formatter.formattedDateString('minusone'),
    });
  }
}

export class MappedTimestamp extends Timestamp {
  constructor(publishedAt: string) {
    const formatter = new Format(publishedAt);
    super({
      date: formatter.dateString(),
      time: formatter.timeString(),
      interval: new MappedInterval(formatter),
    });
  }
}
