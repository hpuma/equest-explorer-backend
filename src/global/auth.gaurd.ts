import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ApiKey } from '@database/models/apikeys/apikey.interface';
import { Request } from 'express';
import { Model } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('APIKEY_MODEL')
    private apiKeyModel: Model<ApiKey>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const key = this.extractApiKeyFromHeader(request);
    const apiUser = await this.apiKeyModel.findOne({ key });

    if (!apiUser) throw new UnauthorizedException();
    const { method, hostname, url } = request;

    console.log(
      `[${method}] 00000  - ${new Date().toLocaleString()} : ${hostname}${url}/${key}`,
    );

    return true;
  }

  private extractApiKeyFromHeader(request: Request): string | string[] {
    const apiKey = request.headers['x-api-key'];
    return apiKey;
  }
}
