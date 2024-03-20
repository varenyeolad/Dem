import { trigger, transition, style, animate } from '@angular/animations';
import { AfterViewInit, Component, Input, PLATFORM_ID, Inject} from '@angular/core';
import { Sound } from '../../shared/sound.interface';
import { FavoriteService } from '../service/favorite.service';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser


@Component({
  selector: 'app-soundbox',
  templateUrl: './soundbox.component.html',
  styleUrls: ['./soundbox.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [  
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ]),
      transition(':leave', [  
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SoundboxComponent implements AfterViewInit {

  @Input() sound!: Sound;

  public soundVolume = 0.30;
  public isFavorite!: boolean;

  private audioElement!: HTMLAudioElement;
  private volumeControl!: HTMLInputElement;
  private audioCtx!: AudioContext;
  private track!: MediaElementAudioSourceNode;
  private gainNode!: GainNode;

  // constructor(private favoriteService: FavoriteService) { }

  // ngOnInit() {
  //   const soundId = this.sound.id(null, "") as string;
  //   this.isFavorite = this.favoriteService.isFavorite(soundId);
  // }



  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.audioElement = (document.getElementById(this.sound.filename) as HTMLAudioElement);
      this.volumeControl = (document.getElementById(this.sound.filename + "-volume") as HTMLInputElement);
    }
  }

  audioControls(sound: Sound): void {
    if (!this.track) {
      this.audioCtx = new AudioContext();
      this.track = this.audioCtx.createMediaElementSource(this.audioElement);
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = this.soundVolume;
      this.track.connect(this.gainNode).connect(this.audioCtx.destination);
      this.audioCtx.resume();
    }

    if (this.audioElement.paused) {
      this.volumeControls();
      sound.playing = true;
      this.audioElement.play();
    } else {
      sound.playing = false;
      this.audioElement.pause();
    }
  }

  volumeControls(): void {
    this.volumeControl.addEventListener('input', (e) => {
      if (this.gainNode) {
        this.gainNode.gain.value = Number((e.target as HTMLInputElement).value);
      }
    }, false);
  }

  // toggleFavorite(): void {
  //   // Call the id method with dummy values
  //   const soundId = this.sound.id(null, ""); // Pass appropriate dummy values
  //   this.favoriteService.toggleFavorite(soundId as string);
  //   this.isFavorite = !this.isFavorite;
  // }
}
