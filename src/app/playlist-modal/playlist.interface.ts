import { Sound } from '../../shared/sound.interface';

export interface Playlist {
  id: string;
  name: string;
  sounds: Sound[];
}
