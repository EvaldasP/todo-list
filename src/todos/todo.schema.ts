import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  ownerId: string;

  @Prop()
  todoName: string;

  @Prop()
  description: string;

  @Prop()
  status: string;

  @Prop()
  date: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
