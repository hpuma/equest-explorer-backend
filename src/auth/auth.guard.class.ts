import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuardService } from './auth.guard.service';
import { Logger } from '@global/helpers';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authGuardService: AuthGuardService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const key = this.extractApiKeyFromHeader(req);
    const apiUser = await this.authGuardService.findApiKey(key as string);

    if (!apiUser) throw new UnauthorizedException();
    Logger.logRequest('guard', req);
    return true;
  }

  private extractApiKeyFromHeader(request: Request): string | string[] {
    const apiKey = request.headers['x-api-key'];
    return apiKey;
  }
}
