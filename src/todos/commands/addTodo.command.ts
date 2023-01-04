import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createTodoDTO } from '../dto/create-todo.dto';
import { Todo, TodoDocument } from '../todo.schema';

export class AddTodoCommand {
  constructor(public createTodoDTO: createTodoDTO) {}
}

@CommandHandler(AddTodoCommand)
export class AddTodoHandler implements ICommandHandler<AddTodoCommand> {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async execute(command: AddTodoCommand): Promise<TodoDocument> {
    const createdTodo = await this.todoModel.create(command.createTodoDTO);

    if (!createdTodo) {
      throw new BadRequestException('Failed to create todo');
    }

    return createdTodo;
  }
}
