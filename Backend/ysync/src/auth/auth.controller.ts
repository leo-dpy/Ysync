import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: { nom: string; email: string; motDePasse: string; role: string }) {
    return this.authService.register(body.nom, body.email, body.motDePasse, body.role);
  }

  @Post('login')
  login(@Body() body: { email: string; motDePasse: string }) {
    return this.authService.login(body.email, body.motDePasse);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() req) {
    return this.authService.me(req.user.sub);
  }
}