import { importProvidersFrom, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuComponent } from './shared/menu/menu.component';
import { SoundboxComponent } from './soundbox/soundbox.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { PomodoroComponent } from './pomodoro-timer/pomodoro/pomodoro.component'; // Import HttpClientModule
import { TimeSelectorComponent } from './pomodoro-timer/time-selector/time-selector.component';
import { TimerDisplayPipe } from './pomodoro-timer/pipe/timer-display.pipe';
import { SettingsComponent } from './pomodoro-timer/settings/settings.component';
import { TasksContainerComponent } from './todo/tasks-container/tasks-container.component';
import { TimerComponent } from './pomodoro-timer/timer/timer.component';
import { LargeButtonComponent } from './tools/large-button/large-button.component';
import { SmallButtonComponent } from './tools/small-button/small-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskService } from './service/task/task.service';
import { TaskComponent } from './todo/task/task.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule} from '@angular/material/dialog';
import { TaskModalComponent } from './todo/task-modal/task-modal.component';
import { SettingsModalComponent } from './pomodoro-timer/settings-modal/settings-modal.component';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthEffects } from './auth/store/auth.effects';
import { appReducer } from './store/app.reducer';
import { ToastComponent } from './shared/toast/toast.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { PlaylistModalComponent } from './playlist-modal/playlist-modal.component'
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
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
   TaskComponent,
   TaskModalComponent,
   SettingsModalComponent,
   HomeComponent,
   PlaylistModalComponent,
  
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, // Add HttpClientModule here
    CommonModule,
    FontAwesomeModule,
    RouterOutlet,
    MatDialogModule,
    MatButtonModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    AuthComponent,
    RouterOutlet,
    NgbModule,
    ToastComponent,
    MatMenuModule,
    MatIconModule,
    MatFormField,  MatFormFieldModule,
    MatInputModule
  
   
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideStore(appReducer),
    provideHttpClient(),
    importProvidersFrom(),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    provideEffects([AuthEffects]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
