import { Component } from '@angular/core';
import { TimerState } from '../../type/TimerState';
import { TimerService } from '../../service/timer/timer.service';
import { MatDialog} from '@angular/material/dialog'
import { TaskModalComponent } from '../../todo/task-modal/task-modal.component';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.scss'
})
export class PomodoroComponent {
  title = 'pomodoro-clock';
  timerState!: TimerState;

  constructor(private timerService: TimerService, private dialog: MatDialog) { }

  ngOnInit() {
    this.timerState = this.timerService.timerState;
  }

  openTaskModal(): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '500px',
      height: '300px',
    });
  }
  openSettingsModal(): void {
    const dialogRef = this.dialog.open(SettingsModalComponent, {
      width: '500px',
      height: '120px', // Adjust width as needed
      // Pass timer state to the modal
      data: { timerState: this.timerService.timerState }
    });
  }
}

