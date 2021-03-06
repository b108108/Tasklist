import { Component, OnInit } from '@angular/core';
import { Task, Status } from '../../interfaces/task';
import { Answer } from '../../interfaces/answer';
import { TaskApiService } from '../task-api.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {
  taskList: Task[] = [];

  isEmptyList = true;
  isShowAddNewTask = false;

  constructor(private taskListService: TaskApiService) { }

  ngOnInit(): void {
    this.taskListService.addTaskThrowInterval().then(() => {
      this.taskList = this.taskListService.getTaskList();
      this.isEmptyList = this.taskListService.getEmptyList();
    });
    this.taskListService.getTaskListLS();
    this.taskList = this.taskListService.getTaskList();
    this.isEmptyList = this.taskListService.getEmptyList();
  }

  removeTask(task: Task, index): void {
    this.taskListService.removeTask(task, index);
    this.isEmptyList = this.taskListService.getEmptyList();
    this.taskList = this.taskListService.getTaskList();
  }

  addNewTask(answer: Answer): void {
    this.isShowAddNewTask = answer.status;
    this.taskListService.setShowAddNewTask(this.isShowAddNewTask);
    if (answer && answer.task && answer.task.title !== '') {
      this.taskListService.addTaskToList(answer.task);
    }
    this.taskList = this.taskListService.getTaskList();
    this.isEmptyList = this.taskListService.getEmptyList();
  }

  markCompleted(task, index): void {
    this.taskListService.markCompleted(task, index);
    this.taskList = this.taskListService.getTaskList();
  }
}
