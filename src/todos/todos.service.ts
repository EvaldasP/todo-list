import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createTodoDTO } from './dto/create-todo.dto';
import { Todo, TodoDocument } from './todo.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  public createTodo(createTodoDTO: createTodoDTO): Promise<TodoDocument> {
    return this.todoModel.create(createTodoDTO);
  }

  public deleteTodo(_id: string) {
    return this.todoModel.findOneAndDelete({ _id });
  }
}
