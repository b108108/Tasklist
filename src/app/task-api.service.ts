import { Injectable } from '@angular/core';
import { Task, Status } from '../interfaces/task';
import { Answer } from '../interfaces/answer';
import { Observable } from 'rxjs';
import { CompileTemplateMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  taskList: Task[] = [];
  lastId = 0;

  isEmptyList = true;
  isShowAddNewTask = false;

  constructor() { }

  /* get all tasks from LocalStorage */
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
    localStorage.setItem('TaskList', JSON.stringify(this.taskList));
    localStorage.setItem('lastId', JSON.stringify(this.lastId));
    this.loadProgress(newTask);
  }

  /* show progress for saving new task */
  loadProgress(task): void {
    const progress = new Observable(this.loading);
    progress.subscribe((data) => {
      task.progress = data;
      if (data === '100%') {
        task.status = Status.todo;
        task.progress = '';
      }
    });
  }

  loading(observer): void {
    const percent = ['0%', '25%', '50%', '75%', '100%'];
    function progress(arr, idx): void {
      setTimeout(() => {
        observer.next(arr[idx]);
        if (idx === arr.length - 1) {
          observer.complete();
        } else {
          progress(arr, ++idx);
        }
      }, 1000);
    }
    progress(percent, 0);
  }
  /****/

  removeTask(task: Task, index): void {
    this.taskList.splice(index, 1);
    localStorage.setItem('TaskList', JSON.stringify(this.taskList));
    if (this.taskList.length === 0) {
      this.isEmptyList = true;
    }
  }

  markCompleted(task, index): void {
    task.status = task.status === 'Completed' ? Status.todo : Status.completed;
  }

  /* auto add new task form 5 till 10 second */
  addTaskThrowInterval(): Promise<boolean> {
    const genTask = {
      id: this.lastId,
      title: 'New task',
      description: 'Auto generate task',
      status: Status.saving
    };
    const interval = this.getRandomArbitrary(5, 10) * 1000;
    return new Promise((resolve, reject) => {
      setInterval(() => {
        const newObj = {};
        for (const prop in genTask) {
          if (genTask.hasOwnProperty(prop)) {
            newObj[prop] = genTask[prop];
          }
        }
        this.addTaskToList(newObj);
        resolve(true);
      }, interval);
    });
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
