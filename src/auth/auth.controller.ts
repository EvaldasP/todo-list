import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginQuery } from './queries/login.query';

@Controller('auth')
export class AuthController {
  constructor(private queryBus: QueryBus) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): Promise<{ access_token: string }> {
    return this.queryBus.execute(new LoginQuery(req.user));
  }
}
