import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { SoundboxComponent } from './soundbox/soundbox.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { PomodoroComponent } from './pomodoro/pomodoro.component'; // Import HttpClientModule
import { TimeSelectorComponent } from './time-selector/time-selector.component';
import { TimerDisplayPipe } from './pipe/timer-display.pipe';
import { SettingsComponent } from './settings/settings.component';
import { TasksContainerComponent } from './tasks-container/tasks-container.component';
import { TimerComponent } from './timer/timer.component';
import { LargeButtonComponent } from './tools/large-button/large-button.component';
import { SmallButtonComponent } from './tools/small-button/small-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskService } from './service/task/task.service';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    SoundboxComponent,
    FooterComponent,
    MenuComponent,
    PomodoroComponent,
    TimerDisplayPipe,
    SettingsComponent,
    AppComponent,
    SmallButtonComponent,
    LargeButtonComponent,
    TimeSelectorComponent,
   TasksContainerComponent,
   TimerComponent,
   MenuComponent,
   TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, // Add HttpClientModule here
    CommonModule,
    FontAwesomeModule,
    RouterOutlet
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
