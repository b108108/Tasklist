import { Component, OnInit } from '@angular/core';
import { Task, Status } from '../../interfaces/task';
import { Answer } from '../../interfaces/answer';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {
  taskList: Task[] = [
    { id: 0, title: 'Dr Nice', description: '', status: Status.todo },
    { id: 1, title: 'Narco', description: '', status: Status.todo },
    { id: 2, title: 'Bombasto', description: '', status: Status.todo },
    { id: 3, title: 'Celeritas', description: '', status: Status.todo },
  ];
  lastId = TasklistComponent.length;
  lastPosition = 3;

  task: Task;
  showAddNewTask = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeStatus(task: Task): void {
    this.task = task;
  }

  removeTask(task: Task): void {
    this.task = task;
  }

  addNewTask(answer: Answer): void {
    this.showAddNewTask = answer.status;
    if (answer && answer.task && answer.task.title !== '') {
      this.addTaskToList(answer.task);
    }
  }

  addTaskToList(newTask): void {
    newTask.id = this.lastId;
    newTask.status = Status.saving;
    this.taskList.push(newTask);
  }
}
