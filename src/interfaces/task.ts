export interface Task {
  id: number;
  title: string;
  status: Status;
  description: string;
}

export enum Status {
  completed = 0,
  todo = 1,
  saving = 2,
  pause = 3,
  stop = 4,
  edit = 5
}
