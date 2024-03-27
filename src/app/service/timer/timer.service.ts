import { Injectable } from '@angular/core';
import { State, TimerState, Type } from '../../type/TimerState';
import { defaultTimerValues } from '../../pomodoro-timer/enum/defaultValue';
import { TaskService } from '../task/task.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerStateKey = 'timerState';

  public timerState: TimerState = this.loadTimerStateFromLocalStorage() || {
    sessionMinute: defaultTimerValues.DEFAULT_SESSION_MINUTES,
    sessionSecond: defaultTimerValues.DEFAULT_SESSION_SECONDS,
    breakMinute: defaultTimerValues.DEFAULT_BREAK_MINUTES,
    breakSecond: defaultTimerValues.DEFAULT_BREAK_SECONDS,
    state: 'stop',
    type: 'session',
    sessionCounter: 0,
  };

  constructor(private taskService: TaskService) {}

  private loadTimerStateFromLocalStorage(): TimerState | null {
    const timerStateString = localStorage.getItem(this.timerStateKey);
    return timerStateString ? JSON.parse(timerStateString) : null;
  }

  private saveTimerStateToLocalStorage(timerState: TimerState): void {
    localStorage.setItem(this.timerStateKey, JSON.stringify(timerState));
  }

  setState(value: State): void {
    this.timerState.state = value;
    this.saveTimerStateToLocalStorage(this.timerState);
  }

  setTimerType(value: Type): void {
    this.timerState.type = value;
    this.saveTimerStateToLocalStorage(this.timerState);
  }

  setBreakTimerValues(minute: TimerState["breakMinute"], second: TimerState["breakSecond"]): void {
    this.timerState.breakMinute = minute;
    this.timerState.breakSecond = second;
    this.saveTimerStateToLocalStorage(this.timerState);
  }

  setSessionTimerValues(minute: TimerState["sessionMinute"], second: TimerState["sessionSecond"]): void {
    this.timerState.sessionMinute = minute;
    this.timerState.sessionSecond = second;
    this.saveTimerStateToLocalStorage(this.timerState);
  }

  incrementSessionCounter() {
    this.timerState.sessionCounter++;
    this.taskService.incrementSessionUsedCounterOfCurrentTask();
    this.saveTimerStateToLocalStorage(this.timerState);
  }
}
