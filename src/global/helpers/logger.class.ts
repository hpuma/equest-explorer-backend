import { Request } from 'express';
import { ConsoleLogger } from '@nestjs/common';

export default class Logger {
  static logRequest(source: string, req: Request) {
    const {
      method,
      url,
      hostname = 'localhost',
      socket: { localPort },
    } = req;

    new ConsoleLogger(`${method}`).log(
      `${new Date().toLocaleString()}\t\t${hostname}:${localPort}${url} [${source}]`,
    );
  }
}
