import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createTodoDTO } from '../dto/create-todo.dto';
import { TodoDocument } from '../todo.schema';
import { TodosService } from '../todos.service';

export class AddTodoCommand {
  constructor(public creteUserDTO: createTodoDTO) {}
}

@CommandHandler(AddTodoCommand)
export class AddTodoHandler implements ICommandHandler<AddTodoCommand> {
  constructor(private readonly _todosService: TodosService) {}

  async execute(command: AddTodoCommand): Promise<TodoDocument> {
    return await this._todosService.createTodo(command.creteUserDTO);
  }
}
