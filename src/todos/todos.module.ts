import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AddTodoHandler } from './commands/addTodo.command';
import { DeleteTodoHandler } from './commands/deleteTodo.command';
import { Todo, TodoSchema } from './todo.schema';
import { TodosController } from './todos.controller';

const commandHandlers = [AddTodoHandler, DeleteTodoHandler];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    CqrsModule,
  ],
  providers: [...commandHandlers],
  controllers: [TodosController],
})
export class TodosModule {}
