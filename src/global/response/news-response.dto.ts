import { Interval, Timestamp } from '@global/newsresource.class';
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

export class MappedTimestamp extends Timestamp {
  constructor(publishedAt: string) {
    const date = Format.stringToDate(publishedAt);
    super({
      date: Format.date(date),
      time: Format.time(date),
      interval: new MappedInterval(date),
    });
  }
}
