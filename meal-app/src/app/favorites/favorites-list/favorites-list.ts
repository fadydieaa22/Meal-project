import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites.service';
import { MealService } from '../../core/services/meal.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  // styleUrls: ['./favorites-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class FavoritesListComponent implements OnInit {
  favoriteMeals: any[] = [];
  isLoading: boolean = true;

  constructor(public favoritesService: FavoritesService, private mealService: MealService) {}

  ngOnInit() {
    this.loadFavorites();
  }

  public loadFavorites() {
    this.isLoading = true;
    const ids = this.favoritesService.getFavorites();

    if (ids.length === 0) {
      this.isLoading = false;
      return;
    }

    this.favoriteMeals = [];
    let loadedCount = 0;

    ids.forEach((id) => {
      this.mealService.getMealDetails(id).subscribe({
        next: (res: any) => {
          if (res.meals && res.meals.length > 0) {
            this.favoriteMeals.push(res.meals[0]);
          }
          loadedCount++;

          // Set loading to false when all requests are complete
          if (loadedCount === ids.length) {
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.error('Error loading favorite meal:', error);
          loadedCount++;

          // Set loading to false even if there's an error
          if (loadedCount === ids.length) {
            this.isLoading = false;
          }
        },
      });
    });
  }

  removeFavorite(mealId: string) {
    // Remove from favorites service
    this.favoritesService.removeFavorite(mealId);

    // Remove from local array
    this.favoriteMeals = this.favoriteMeals.filter((meal) => meal.idMeal !== mealId);

    // Optional: Show success message
    console.log('Meal removed from favorites');
  }

  removeFavoriteInstant(mealId: string) {
    this.favoritesService.removeFavorite(mealId);
    this.favoriteMeals = this.favoriteMeals.filter((m) => m.idMeal !== mealId);
  }
}
