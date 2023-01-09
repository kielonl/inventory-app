export interface Task {
  type: string;
  name: string;
  uuid?: string;
}

export interface UpdateTask extends Omit<Task, "uuid"> {
  message?: string;
}

export interface TaskError {
  errorMessage: string;
}
