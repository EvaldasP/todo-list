import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from '../dto/create-user.dto';
import { User, UserDocument } from '../users.schema';
import * as bcrypt from 'bcrypt';

export class AddUserCommand {
  constructor(public createUserDTO: CreateUserDTO) {}
}

@CommandHandler(AddUserCommand)
export class AddUserHandler implements ICommandHandler<AddUserCommand> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async execute(command: AddUserCommand): Promise<UserDocument> {
    const { username, password } = command.createUserDTO;

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    return this.userModel.create({
      username,
      password: hashedPassword,
    });
  }
}
