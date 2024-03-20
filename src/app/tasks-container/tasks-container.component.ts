import { Task } from './../type/Task';
import { TaskService } from './../service/task/task.service';
import { Component, OnInit } from '@angular/core';
import { TimerService } from '../service/timer/timer.service';

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss']
})
export class TasksContainerComponent implements OnInit {

  tasksState = this.taskService.tasksState;
  timerState = this.timerService.timerState;

  formName!: Task["name"];
  formSessionNeeded: Task["sessionsNeeded"] = 1;

  constructor(private taskService: TaskService, private timerService: TimerService) { }

  ngOnInit(): void {
  }

  addTask() {
    this.taskService.addTask({name: this.formName, isSelected: false, sessionsUsed: 0, sessionsNeeded: this.formSessionNeeded, status: 'pending'})
    this.formName = '';
  }

}
