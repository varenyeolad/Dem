import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { Sound } from '../../shared/sound.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { selectUser } from '../auth/store/auth.selectors';
import { logoutAction } from '../auth/store/auth.actions';
import { PlaylistModalComponent } from '../playlist-modal/playlist-modal.component'; // Импортируем компонент модального окна

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ]),
      transition(':leave', [  
        animate(200, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent {
[x: string]: any;
  public soundList!: Sound[];

  isMenuCollapsed = true;
  userEmail!: Observable<string>;

  constructor(
    private http: HttpClient, 
    private store: Store<AppState>,
    public dialog: MatDialog // Внедряем MatDialog
  ) { 
    this.userEmail = new Observable<string>();
  }

  ngOnInit(): void {
    this.loadSounds();
    this.userEmail = this.store.select(selectUser).pipe(
      map(user => user?.email ?? ''),
    )
  };

  onLogout() {
    this.store.dispatch(resetTodoStateAction());
    this.store.dispatch(logoutAction());
  };

  openPlaylistModal(soundsToAdd: Sound[]): void {
    const dialogRef = this.dialog.open(PlaylistModalComponent, {
      width: '400px',
      data: { soundsToAdd: soundsToAdd }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });
  }

  // Sound
  loadSounds(): void {
    this.getSoundList().subscribe({
      next: (data: Sound[]) => {
        this.soundList = data;
      },
      error: (error: { status: string; statusText: string; }) => {
        alert('Couldn\'t load sound list! (' + error.status + ' ' + error.statusText + ')');
      }
    });
  }

  getSoundList(): Observable<any> {
    return this.http.get('./assets/soundlist.json');
  }
  muteAllSounds(): void {
    this.soundList.forEach(sound => {
      (document.getElementById(sound.filename) as HTMLAudioElement).pause();
      sound.playing = false;
    });
  }
}

function resetTodoStateAction(): any {
  throw new Error('Function not implemented.');
}
