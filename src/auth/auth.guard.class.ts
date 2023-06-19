import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuardService } from './auth.guard.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authGaurdService: AuthGuardService) {}
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
