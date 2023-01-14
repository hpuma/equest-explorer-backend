class Format {
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
export { Format };
