import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task, Status } from '../../interfaces/task';
import { Answer } from '../../interfaces/answer';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.scss']
})
export class CreatetaskComponent implements OnInit {
  @Input() showAddNewTask: boolean;
  @Output() public closeAddNewTask = new EventEmitter();

  newTask: Task;
  title = 'Noname Task';
  description = '';

  constructor() { }

  ngOnInit(): void {
    this.newTask = { id: 0, title: '', description: '', status: null };
  }

  addNewTask(): void {
    this.showAddNewTask = false;
    this.newTask.title = this.title;
    this.newTask.description = this.description;

    const answer: Answer = {
      task: this.newTask,
      status: false
    };
    this.closeAddNewTask.emit(answer);
  }
}
