import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sound } from '../shared/sound.interface';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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
export class AppComponent implements OnInit {

  public soundList!: Sound[];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadSounds();
  }

  // Sound
  loadSounds(): void {
    this.getSoundList().subscribe({
      next: data => {
        this.soundList = data;
      },
      error: error => {
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
