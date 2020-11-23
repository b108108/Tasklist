import { Injectable } from '@angular/core';
import { Task, Status } from '../interfaces/task';
import { Answer } from '../interfaces/answer';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  taskList: Task[] = [];
  lastId = 0;

  isEmptyList = true;
  isShowAddNewTask = false;

  constructor() { }

  getTaskListLS(): void {
    if (localStorage.getItem('TaskList').length === 0) {
      this.taskList = [];
      this.lastId = 0;
    } else {
      this.taskList = JSON.parse(localStorage.getItem('TaskList'));
      this.lastId = JSON.parse(localStorage.getItem('lastId'));
    }
    this.isEmptyList = this.taskList.length > 0 ? false : true;
    this.lastId = this.taskList.length;
  }

  addNewTask(answer: Answer): void {
    this.isShowAddNewTask = answer.status;
    if (answer && answer.task && answer.task.title !== '') {
      this.addTaskToList(answer.task);
    }
  }

  addTaskToList(newTask): void {
    let isAddNew = false;
    newTask.id = this.lastId++;
    newTask.status = Status.saving;
    this.isEmptyList = false;
    for (let i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].title < newTask.title) {
        this.taskList.splice(i, 0, newTask);
        isAddNew = true;
        break;
      }
    }
    if (!isAddNew) {
      this.taskList.push(newTask);
    }
    this.markToDo(newTask);
    localStorage.setItem('TaskList', JSON.stringify(this.taskList));
    localStorage.setItem('lastId', JSON.stringify(this.lastId));
  }

  removeTask(task: Task, index): void {
    this.taskList.splice(index, 1);
    localStorage.setItem('TaskList', JSON.stringify(this.taskList));
    if (this.taskList.length === 0) {
      this.isEmptyList = true;
    }
  }

  markCompleted(task, index): void {
    task.status = Status.completed;
  }

  markToDo(task): void {
    setTimeout(() => {
      task.status = Status.todo;
    }, 4000);
  }

  addTaskThrowInterval(): void {
    const genTask = {
      id: this.lastId,
      title: 'New task',
      description: 'Auto generate task',
      status: Status.saving
    };
    const interval = this.getRandomArbitrary(5, 10) * 1000;
    setInterval(() => {
      const newObj = {};
      for (const prop in genTask) {
        if (genTask.hasOwnProperty(prop)) {
          newObj[prop] = genTask[prop];
        }
      }
      this.addTaskToList(newObj);
    }, interval);
  }

  getTaskList(): Task[] {
    return this.taskList;
  }

  getEmptyList(): boolean {
    return this.isEmptyList;
  }

  getShowAddNewTask(): boolean {
    return this.isShowAddNewTask;
  }

  setShowAddNewTask(value): void {
    this.isShowAddNewTask = value;
  }

  getRandomArbitrary(min, max): number {
    return Math.random() * (max - min) + min;
  }
}
