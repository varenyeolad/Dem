// favorite.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: { [id: string]: boolean } = {};

  constructor() {}

  toggleFavorite(id: string): void {
    this.favorites[id] = !this.favorites[id];
   
  }

  isFavorite(id: string): boolean {
    return !!this.favorites[id];
  }
}
