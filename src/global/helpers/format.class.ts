class Time {
  static roundMinute(date: Date, direction: string) {
    const minutes = 1;
    const ms = 1000 * 60 * minutes;
    switch (direction) {
      case 'plusone':
        return new Date(Math.ceil(date.getTime() / ms) * ms);
      case 'minusone':
        return new Date(Math.floor(date.getTime() / ms) * ms - ms);
      default:
        return date;
    }
  }
}

export default class Format {
  stringToDate: Date;
  constructor(publishedAt: string) {
    const year = parseInt(publishedAt.substring(0, 4));
    const month = parseInt(publishedAt.substring(4, 2)) - 1;
    const day = parseInt(publishedAt.substring(6, 2));
    const hours = parseInt(publishedAt.substring(9, 2));
    const minutes = parseInt(publishedAt.substring(11, 2));
    const seconds = parseInt(publishedAt.substring(13, 2));
    this.stringToDate = new Date(year, month, day, hours, minutes, seconds);
  }

  dateString(direction = '') {
    const isTimeFrame = direction === 'plusone' || direction === 'minusone';
    const date = isTimeFrame
      ? Time.roundMinute(this.stringToDate, direction)
      : this.stringToDate;

    return (
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    );
  }
  timeString() {
    return this.stringToDate.toLocaleTimeString('en', {
      timeStyle: 'medium',
      hour12: false,
      timeZone: 'EST',
    });
  }
  formattedDateString(direction = '') {
    const isTimeFrame = direction === 'plusone' || direction === 'minusone';

    return isTimeFrame
      ? this.dateString(direction)
      : this.dateString(direction) + ' ' + this.timeString();
  }
}
