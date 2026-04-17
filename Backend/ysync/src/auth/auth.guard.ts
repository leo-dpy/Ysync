import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException();

    try {
      req['user'] = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET ?? 'super-secret',
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
