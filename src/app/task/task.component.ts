import { TaskService } from './../service/task/task.service';
import { Component, Input } from '@angular/core';
import { TimerService } from '../service/timer/timer.service';
import { faCircleCheck as faCircleCheckSolid, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task: any;
  status!: 'standby'
  timerState = this.timerService.timerState;

  faTrash = faTrash;
  faCircleCheckSolid = faCircleCheckSolid;
  faCircleCheckRegular = faCircleCheck;

  constructor(private taskservice: TaskService, private timerService: TimerService) { }

  selectCurrentTask() {
    this.taskservice.selectCurrentTask(this.task);
  }

  markAsPendingButtonEvent() {
    this.taskservice.changeStatus(this.task, 'pending');
  }

  markAsDoneButtonEvent() {
    this.taskservice.changeStatus(this.task, 'done');
  }

  deleteTaskButtonEvent() {
    this.taskservice.deleteTask(this.task);
  }

}
