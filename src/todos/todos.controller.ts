import { Body, Controller, Delete, Param, Post, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddTodoCommand } from './commands/addTodo.command';
import { DeleteTodoCommand } from './commands/deleteTodo.command';
import { createTodoDTO } from './dto/create-todo.dto';
import { TodoDocument } from './todo.schema';

@Controller('todos')
export class TodosController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/add-todo')
  async addTodo(@Body() createTodoDTO: createTodoDTO): Promise<TodoDocument> {
    return this.commandBus.execute(new AddTodoCommand(createTodoDTO));
  }

  @Delete('/delete-todo/:id')
  async deleteTodo(@Param('id') _id: string): Promise<TodoDocument> {
    return this.commandBus.execute(new DeleteTodoCommand(_id));
  }
}
