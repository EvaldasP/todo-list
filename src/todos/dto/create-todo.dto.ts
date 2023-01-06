import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

enum TodoStatus {
  NOT_STARTED = 'not started',
  IN_PROGRESS = 'in progress',
  ON_HOLD = 'on hold',
  FINISHED = 'finished',
}

export class CreateTodoDTO {
  @IsNotEmpty()
  ownerId: string;

  @IsNotEmpty()
  todoName: string;

  @IsOptional()
  description: string;

  @IsEnum(TodoStatus)
  status: TodoStatus;

  @IsNotEmpty()
  date: Date;
}
