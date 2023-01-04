enum todoStatus {
  NOT_STARTED = 'not started',
  IN_PROGRESS = 'in progress',
  ON_HOLD = 'on hold',
  FINISHED = 'finished',
}

export interface createTodoDTO {
  ownerId: string;
  todoName: string;
  description: string;
  status: todoStatus;
  date: Date;
}
