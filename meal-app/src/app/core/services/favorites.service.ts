import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private key = 'favoriteMeals';

  constructor(private authService: AuthService, private router: Router) {}

  getFavorites(): string[] {
    if (!this.authService.isLoggedIn()) {
      return [];
    }
    const favs = localStorage.getItem(this.key);
    return favs ? JSON.parse(favs) : [];
  }

  addFavorite(mealId: string): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const favs = this.getFavorites();
    if (!favs.includes(mealId)) {
      favs.push(mealId);
      localStorage.setItem(this.key, JSON.stringify(favs));
    }
    return true;
  }

  removeFavorite(mealId: string): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    let favs = this.getFavorites();
    favs = favs.filter((id) => id !== mealId);
    localStorage.setItem(this.key, JSON.stringify(favs));
    return true;
  }

  isFavorite(mealId: string): boolean {
    if (!this.authService.isLoggedIn()) {
      return false;
    }
    return this.getFavorites().includes(mealId);
  }
}
