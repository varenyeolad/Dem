import { Component } from '@angular/core';
import { TimerState } from '../type/TimerState';
import { TimerService } from '../service/timer/timer.service';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.scss'
})
export class PomodoroComponent {
  title = 'pomodoro-clock';
  timerState!: TimerState;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.timerState = this.timerService.timerState;
  }
}
