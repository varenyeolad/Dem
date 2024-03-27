// playlist.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sound } from '../../../shared/sound.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlists: { name: string, sounds: Sound[] }[] = [];
  private selectedSounds: Sound[] = [];
  private playlistsSubject = new BehaviorSubject<{ name: string, sounds: Sound[] }[]>([]);

  constructor() { }

  addToSelectedSounds(sound: Sound): void {
    if (!this.selectedSounds.includes(sound)) {
      this.selectedSounds.push(sound);
    }
  }

  getSelectedSounds(): Sound[] {
    return this.selectedSounds;
  }

  clearSelectedSounds(): void {
    this.selectedSounds = [];
  }

  addToPlaylist(name: string, sounds: Sound[]): void {
    this.playlists.push({ name, sounds });
    this.playlistsSubject.next([...this.playlists]);
  }

  getPlaylists(): BehaviorSubject<{ name: string, sounds: Sound[] }[]> {
    return this.playlistsSubject;
  }
}
