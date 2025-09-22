import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesListComponent } from '../favorites-list/favorites-list';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, FavoritesListComponent],
  template: `
    <div class="favorites-wrapper">
      <app-favorites-list></app-favorites-list>
    </div>
  `,
  styles: [
    `
      .favorites-wrapper {
        min-height: 100vh;
        background: linear-gradient(135deg, #f8fffe 0%, #ffffff 100%);
      }
    `,
  ],
})
export class Favorites {
  constructor() {
    // Component logic can be added here if needed
  }
}
