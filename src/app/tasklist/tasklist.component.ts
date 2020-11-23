import { Component, OnInit } from '@angular/core';
import { Task, Status } from '../../interfaces/task';
import { Answer } from '../../interfaces/answer';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {
  taskList: Task[] = [];
  lastId = 0;

  isEmptyList = true;
  isShowAddNewTask = false;

  constructor() { }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList(): void {
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

  changeStatus(task: Task): void {
    // this.task = task;
  }

  removeTask(task: Task, index): void {
    this.taskList.splice(index, 1);
    localStorage.setItem('TaskList', JSON.stringify(this.taskList));
    if (this.taskList.length === 0) {
      this.isEmptyList = true;
    }
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
  }

  markCompleted(task, index): void {
    task.status = Status.completed;
  }
}
