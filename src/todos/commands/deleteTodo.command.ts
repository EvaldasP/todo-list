import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from '../todo.schema';

export class DeleteTodoCommand {
  @IsNotEmpty()
  public _id: string;

  constructor(_id: string) {
    this._id = _id;
  }
}

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async execute(command: DeleteTodoCommand): Promise<TodoDocument> {
    const deletedTodo = await this.todoModel.findOneAndDelete({
      _id: command._id,
    });

    if (!deletedTodo) {
      throw new NotFoundException('Failed to delete todo');
    }

    return deletedTodo;
  }
}
