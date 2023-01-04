import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from '../todo.schema';

export class DeleteTodoCommand {
  constructor(public _id: string) {}
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
