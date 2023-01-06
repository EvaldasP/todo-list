import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddTodoCommand } from './commands/addTodo.command';
import { DeleteTodoCommand } from './commands/deleteTodo.command';
import { createTodoDTO } from './dto/create-todo.dto';
import { TodoDocument } from './todo.schema';

@UseGuards(JwtAuthGuard)
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
