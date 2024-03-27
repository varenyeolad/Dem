import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimerState } from '../../type/TimerState';
@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrl: './settings-modal.component.scss'
})
export class SettingsModalComponent {
  timerState: TimerState; 

  constructor(
    public dialogRef: MatDialogRef<SettingsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { timerState: TimerState }
  ) {
    this.timerState = data.timerState; 
  }
}
