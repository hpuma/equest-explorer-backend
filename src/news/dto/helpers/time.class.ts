export default class Time {
  static roundMinute(date: Date, direction: string): Date {
    const minutes = 1;
    const ms = 1000 * 60 * minutes;
    switch (direction) {
      case 'up':
        return new Date(Math.ceil(date.getTime() / ms) * ms);
      case 'down':
        return new Date(Math.floor(date.getTime() / ms) * ms - ms);
      default:
        return null;
    }
  }
}
