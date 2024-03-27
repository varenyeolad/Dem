import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../../service/settings/settings.service';

import { TimerService } from '../../service/timer/timer.service';

import { defaultTimerValues } from '../enum/defaultValue';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss']
})
export class TimeSelectorComponent implements OnInit {
  @Input() timeSelectorName!: 'Break' | 'Session';
  @Input() minValue!: number;
  @Input() maxValue!: number;

  value!: number;

  constructor(private timerService: TimerService, private settingsService: SettingsService) { }

  ngOnInit(): void {
    if (this.timeSelectorName === 'Break') {
      this.value = this.timerService.timerState.breakMinute;
    } else if (this.timeSelectorName === 'Session') {
      this.value = this.timerService.timerState.sessionMinute;
    }
  }

  put(amount: number): void {
    if (this.value + amount <= this.maxValue && this.value + amount > this.minValue) {
      this.value += amount;

      if (this.timeSelectorName === 'Session') {
        this.settingsService.setSessionTimerSettingsValues(this.value, defaultTimerValues.DEFAULT_SESSION_SECONDS)
        this.timerService.setSessionTimerValues(this.value, defaultTimerValues.DEFAULT_SESSION_SECONDS);
      } else if (this.timeSelectorName === 'Break') {
        this.settingsService.setSessionTimerSettingsValues(this.value, defaultTimerValues.DEFAULT_BREAK_SECONDS)
        this.timerService.setBreakTimerValues(this.value, defaultTimerValues.DEFAULT_SESSION_SECONDS)
      }
    }
  }

}
