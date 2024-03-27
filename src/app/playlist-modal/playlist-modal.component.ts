import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sound } from '../../shared/sound.interface';

@Component({
  selector: 'app-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrls: ['./playlist-modal.component.scss']
})
export class PlaylistModalComponent {

  playlistName: string = '';
  soundsToAdd: Sound[] = [];

  constructor(
    public dialogRef: MatDialogRef<PlaylistModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.soundsToAdd = data.soundsToAdd;
  }
  playPlaylist(): void {
    this.data.playlist.sounds.forEach((sound: { filename: string; playing: boolean; }) => {
      const audioElement = document.getElementById(sound.filename) as HTMLAudioElement;
      if (audioElement) {
        audioElement.play();
        sound.playing = true;
      }
    });
  }

  pausePlaylist(): void {
    this.data.playlist.sounds.forEach((sound: { filename: string; playing: boolean; }) => {
      const audioElement = document.getElementById(sound.filename) as HTMLAudioElement;
      if (audioElement) {
        audioElement.pause();
        sound.playing = false;
      }
    }
    )};

  onSave(): void {
    // Сохраняем выбранные звуки в локальное хранилище
    localStorage.setItem(this.playlistName, JSON.stringify(this.soundsToAdd));
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}