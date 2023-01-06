import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../users/users.schema';
import { ValidateUserDTO } from './dto/validate-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    validateUserDTO: ValidateUserDTO,
  ): Promise<Pick<UserDocument, '_id' | 'username'>> {
    const { username, password } = validateUserDTO;

    const user = await this.usersService.getUserByUsername(username);

    const passwordValid = await bcrypt.compare(password, user?.password);

    if (user && passwordValid) {
      //TODO: check why spreading {password,...other} doesn't work properly
      return { username: user.username, _id: user._id };
    }

    return null;
  }
}
