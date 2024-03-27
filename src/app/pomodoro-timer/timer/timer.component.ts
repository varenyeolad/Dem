import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../service/settings/settings.service';
import { TaskService } from '../../service/task/task.service';

import { TimerService } from '../../service/timer/timer.service';
import { TaskState } from '../../type/Task';
import { State, TimerState } from '../../type/TimerState';

import { faForwardStep, faPause, faPlay, faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  timerState!: TimerState;
  taskState!: TaskState;
  interval: any;

  faRotateRight = faRotateRight;
  faPlay = faPlay;
  faForwardStep = faForwardStep;
  faPause = faPause;

  constructor(private timerService: TimerService, private settingsService: SettingsService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.timerState = this.timerService.timerState;
    this.taskState = this.taskService.tasksState;
  }

  changeState(value: State): void {
    if (this.timerState.state === 'start') {
      this.setTimerOff();
    }
    else if (this.timerState.state === 'stop') {
      this.setTimerOn();
    }
    this.timerService.setState(value);
  }

  setTimerOn(): void {
    this.interval = setInterval(() => {
      if (this.timerState.type === 'break') {
        this.decreaseBreakTimer();

        if (this.isBreakTimerOver()) {
          this.setSessionTimer();
          this.resetBreakTimer();
        }
      } else if (this.timerState.type === 'session') {
        this.decreaseSessionTimer();

        if (this.isSessionTimerOver()) {
          this.setBreakTimer();
          this.resetSessionTimer();
          this.timerService.incrementSessionCounter();
        }
      }
    }, 1000); 
  }

  decreaseBreakTimer(): void {
    if (this.timerState.breakSecond === 0) {
      this.timerState.breakSecond = 59;
      this.timerState.breakMinute--;
    } else {
      this.timerState.breakSecond--;
    }
  }

  decreaseSessionTimer(): void {
    if (this.timerState.sessionSecond === 0) {
      this.timerState.sessionSecond = 59;
      this.timerState.sessionMinute--;
    } else {
      this.timerState.sessionSecond--;
    }
  }

  isBreakTimerOver(): boolean {
    return this.timerState.breakMinute === 0 && this.timerState.breakSecond === 0;
  }

  isSessionTimerOver(): boolean {
    return this.timerState.sessionMinute === 0 && this.timerState.sessionSecond === 0;
  }

  setTimerOff(): void {
    clearInterval(this.interval);
  }

  setSessionTimer(): void {
    this.timerService.setTimerType('session');
  }

  setBreakTimer(): void {
    this.timerService.setTimerType('break');
  }

  resetSessionTimer(): void {
    this.timerService.setSessionTimerValues(this.settingsService.settingsState.sessionMinuteSettings, this.settingsService.settingsState.sessionSecondSettings);
  }

  resetBreakTimer(): void {
    this.timerService.setBreakTimerValues(this.settingsService.settingsState.breakMinuteSettings, this.settingsService.settingsState.breakSecondSettings);
  }

  skipTimer(): void {
    if (this.timerState.type === 'break') {
      this.setSessionTimer();
      this.resetBreakTimer();
    } else if (this.timerState.type === 'session') {
      this.setBreakTimer();
      this.resetSessionTimer();
      this.timerService.incrementSessionCounter();
    }
  }

  resetTimer(): void {
    this.setTimerOff();
    this.timerService.setState('stop');
    this.timerService.setTimerType('session');
    this.resetBreakTimer();
    this.resetSessionTimer();
    this.setSessionTimer();
  }
}
