import { Body, Controller, Post } from '@nestjs/common';
import { UserDocument } from './users.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { AddUserCommand } from './commands/addUser.command';

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/signup')
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new AddUserCommand(createUserDTO));
  }
}
