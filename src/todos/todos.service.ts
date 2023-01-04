import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query, QueryWithHelpers } from 'mongoose';
import { createTodoDTO } from './dto/create-todo.dto';
import { Todo, TodoDocument } from './todo.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  public async createTodo(createTodoDTO: createTodoDTO): Promise<TodoDocument> {
    return await this.todoModel.create(createTodoDTO);
  }

  public async deleteTodo(_id: string): Promise<TodoDocument> {
    return await this.todoModel.findOneAndDelete({ _id });
  }
}
