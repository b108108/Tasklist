import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  addTaskForm: FormGroup;

  newTask: Task;
  title = 'Noname Task';
  description = '';

  constructor() {
    this.addTaskForm = new FormGroup({
      'titleTask': new FormControl('Input title'),
      'descriptionTask': new FormControl('')
    });
  }

  ngOnInit(): void {
    this.newTask = {
      id: 0,
      title: '',
      description: '',
      status: null,
      progress: ''
    };
  }

  submit(): void {
    this.showAddNewTask = false;
    this.newTask.title = this.addTaskForm.value.titleTask;
    this.newTask.description = this.addTaskForm.value.descriptionTask;

    const answer: Answer = {
      task: this.newTask,
      status: false
    };
    this.closeAddNewTask.emit(answer);
  }
}
