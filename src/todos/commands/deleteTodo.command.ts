import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoDocument } from '../todo.schema';
import { TodosService } from '../todos.service';

export class DeleteTodoCommand {
  constructor(public _id: string) {}
}

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(private readonly _todosService: TodosService) {}

  async execute(command: DeleteTodoCommand): Promise<TodoDocument> {
    const deletedTodo = await this._todosService.deleteTodo(command._id);

    if (!deletedTodo) {
      throw new NotFoundException('Failed to delete todo');
    }

    return deletedTodo;
  }
}
