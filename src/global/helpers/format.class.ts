export default class Format {
  static stringToDate(publishedAt: string) {
    const year = parseInt(publishedAt.substring(0, 4));
    const month = parseInt(publishedAt.substring(4, 2)) - 1; // Months are zero-based in JavaScript Date object
    const day = parseInt(publishedAt.substring(6, 2));
    const hours = parseInt(publishedAt.substring(9, 2));
    const minutes = parseInt(publishedAt.substring(11, 2));
    const seconds = parseInt(publishedAt.substring(13, 2));

    return new Date(year, month, day, hours, minutes, seconds);
  }
  static date(date: Date) {
    return (
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    );
  }
  static time(date: Date) {
    return date.toLocaleTimeString('en', {
      timeStyle: 'medium',
      hour12: false,
      timeZone: 'EST',
    });
  }

  static dateString(date: Date) {
    return Format.date(date) + ' ' + Format.time(date);
  }
}
