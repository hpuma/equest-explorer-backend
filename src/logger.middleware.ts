import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const {
      url,
      method,
      hostname = 'localhost',
      socket: { localPort },
    } = req;

    console.log(`[${method}] ${hostname}:${localPort}${url}`);
    if (next) next();
  }
}
