export interface Task {
  type: string;
  name: string;
  uuid?: string;
}

export interface UpdateTask extends Omit<Task, "uuid"> {
  message?: string;
}
