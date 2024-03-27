import { trigger, transition, style, animate } from '@angular/animations';
import { AfterViewInit, Component, Input, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { Sound } from '../../shared/sound.interface';
import { isPlatformBrowser } from '@angular/common';

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
  private isInteracted = false; // Track if user has interacted with the component

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone // Inject NgZone
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        this.audioElement = (document.getElementById(this.sound.filename) as HTMLAudioElement);
        this.volumeControl = (document.getElementById(this.sound.filename + "-volume") as HTMLInputElement);

        // Retrieve playing state from local storage
        const isPlaying = localStorage.getItem(this.sound.filename);
        if (isPlaying === 'true') {
          this.zone.run(() => {
            this.playAudio();
          });
        }
      });
    }
  }

  audioControls(sound: Sound): void {
    if (this.audioElement.paused) {
      this.playAudio();
    } else {
      this.pauseAudio();
    }
  }

  playAudio(): void {
    if (!this.isInteracted) {
      this.isInteracted = true; // Set flag indicating user interaction
    }

    this.volumeControls();
    this.audioElement.play().catch(error => {
      // Auto-play was prevented, handle it here (e.g., show a play button)
      console.error('Auto-play was prevented:', error);
    });

    this.sound.playing = true;
    // Store playing state in local storage
    localStorage.setItem(this.sound.filename, 'true');
  }

  pauseAudio(): void {
    this.audioElement.pause();
    this.sound.playing = false;
    // Remove playing state from local storage
    localStorage.removeItem(this.sound.filename);
  }

  volumeControls(): void {
    this.volumeControl.addEventListener('input', (e) => {
      this.audioElement.volume = Number((e.target as HTMLInputElement).value);
    }, false);
  }
}
