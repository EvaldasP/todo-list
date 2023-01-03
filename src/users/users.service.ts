import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';

export interface UserView {
  _id: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { username, password } = createUserDTO;

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    return this.userModel.create({
      username,
      password: hashedPassword,
    });
  }
  async getUserByUsername(username: string): Promise<UserView> {
    return this.userModel.findOne({ username });
  }
}
