import { Injectable } from '@angular/core';
import { SettingsState } from '../../type/SettingsState';

import { defaultTimerValues } from '../../enum/defaultValue';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public settingsState : SettingsState = {
    breakMinuteSettings : defaultTimerValues.DEFAULT_BREAK_MINUTES,
    breakSecondSettings : defaultTimerValues.DEFAULT_BREAK_SECONDS,
    sessionMinuteSettings : defaultTimerValues.DEFAULT_SESSION_MINUTES,
    sessionSecondSettings : defaultTimerValues.DEFAULT_SESSION_SECONDS,
  };

  constructor() {
  }

  setBreakTimerSettingsValues(minute: SettingsState["breakMinuteSettings"], second: SettingsState["breakSecondSettings"]): void {
    this.settingsState.breakMinuteSettings = minute;
    this.settingsState.breakSecondSettings = second;
  }

  setSessionTimerSettingsValues(minute: SettingsState["sessionMinuteSettings"], second: SettingsState["sessionSecondSettings"]): void {
    this.settingsState.sessionMinuteSettings = minute;
    this.settingsState.sessionSecondSettings = second;
  }
}
