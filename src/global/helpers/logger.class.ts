import { Request } from 'express';

export default class Logger {
  static logRequest(source: string, req: Request) {
    const {
      method,
      url,
      hostname = 'localhost',
      socket: { localPort },
    } = req;

    // console.log(
    //   `[${method}]\t\t${new Date().toLocaleString()}\t\t${hostname}:${localPort}${url} [${source}]`,
    // );
  }
}
