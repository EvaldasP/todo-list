import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddTodoCommand } from './commands/addTodo.command';
import { createTodoDTO } from './dto/create-todo.dto';
import { Todo } from './todo.schema';

@Controller('todos')
export class TodosController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/add-todo')
  async addTodo(@Body() createTodoDTO: createTodoDTO): Promise<Todo> {
    return this.commandBus.execute(new AddTodoCommand(createTodoDTO));
  }
}
