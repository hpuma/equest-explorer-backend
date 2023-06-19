import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGaurdService } from './auth.gaurd.service';

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private readonly authGaurdService: AuthGaurdService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const key = this.extractApiKeyFromHeader(request);
    const apiUser = await this.authGaurdService.findApiKey(key as string);

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
