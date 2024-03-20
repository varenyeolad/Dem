import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'pomodoro', component: PomodoroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
