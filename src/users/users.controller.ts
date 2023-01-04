import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserDocument } from './users.schema';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserDocument> {
    return await this.usersService.createUser(createUserDTO);
  }
}
