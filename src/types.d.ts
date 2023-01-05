export interface Task {
  title: string;
  description: string;
  id?: number;
}

export interface ApiTask {
  type: string;
  name: string;
  id: string;
}
