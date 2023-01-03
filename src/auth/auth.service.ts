import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService, UserView } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Pick<UserView, '_id' | 'username'>> {
    const user = await this.usersService.getUserByUsername(username);

    const passwordValid = await bcrypt.compare(password, user?.password);

    if (user && passwordValid) {
      //TODO: check why spreading {password,...other} doesn't work properly
      return { username: user.username, _id: user._id };
    }

    return null;
  }

  async login(user: UserView): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
