import { Injectable } from '@angular/core';
import { SettingsState } from '../../type/SettingsState';
import { defaultTimerValues } from '../../pomodoro-timer/enum/defaultValue';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settingsStateKey = 'settingsState';

  public settingsState: SettingsState = this.loadSettingsStateFromLocalStorage() || {
    breakMinuteSettings: defaultTimerValues.DEFAULT_BREAK_MINUTES,
    breakSecondSettings: defaultTimerValues.DEFAULT_BREAK_SECONDS,
    sessionMinuteSettings: defaultTimerValues.DEFAULT_SESSION_MINUTES,
    sessionSecondSettings: defaultTimerValues.DEFAULT_SESSION_SECONDS,
  };

  constructor() {}

  private loadSettingsStateFromLocalStorage(): SettingsState | null {
    const settingsStateString = localStorage.getItem(this.settingsStateKey);
    return settingsStateString ? JSON.parse(settingsStateString) : null;
  }

  private saveSettingsStateToLocalStorage(settingsState: SettingsState): void {
    localStorage.setItem(this.settingsStateKey, JSON.stringify(settingsState));
  }

  setBreakTimerSettingsValues(minute: SettingsState["breakMinuteSettings"], second: SettingsState["breakSecondSettings"]): void {
    this.settingsState.breakMinuteSettings = minute;
    this.settingsState.breakSecondSettings = second;
    this.saveSettingsStateToLocalStorage(this.settingsState);
  }

  setSessionTimerSettingsValues(minute: SettingsState["sessionMinuteSettings"], second: SettingsState["sessionSecondSettings"]): void {
    this.settingsState.sessionMinuteSettings = minute;
    this.settingsState.sessionSecondSettings = second;
    this.saveSettingsStateToLocalStorage(this.settingsState);
  }
}
