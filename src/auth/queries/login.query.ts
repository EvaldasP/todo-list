import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../../users/users.schema';

export class LoginQuery {
  constructor(public user: Pick<UserDocument, '_id' | 'username'>) {}
}

@QueryHandler(LoginQuery)
export class LoginQueryHandler implements IQueryHandler<LoginQuery> {
  constructor(private jwtService: JwtService) {}

  async execute(query: LoginQuery): Promise<{
    access_token: string;
  }> {
    const { _id, username } = query.user;
    const payload = { username: username, sub: _id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
