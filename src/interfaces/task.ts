export interface Task {
  id: number;
  title: string;
  status: Status;
  description: string;
}

export enum Status {
  completed = 'Completed',
  todo = 'In Progress',
  saving = 'Saving',
  pause = 'Pause',
  stop = 'Stop',
  edit = 'Edit'
}
