import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealService } from '../core/services/meal.service';
import { FavoritesService } from '../core/services/favorites.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  featuredMeals: any[] = [];

  constructor(private mealService: MealService, public favoritesService: FavoritesService) {}

  ngOnInit() {
    // Load featured meals (first 6 meals from Beef category for demo)
    this.mealService.getMealsByCategory('Beef').subscribe((res: any) => {
      this.featuredMeals = (res.meals || []).slice(0, 6);
    });
  }

  isFavorite(meal: any): boolean {
    return this.favoritesService.isFavorite(meal.idMeal);
  }

  toggleFavorite(meal: any) {
    if (this.isFavorite(meal)) {
      this.favoritesService.removeFavorite(meal.idMeal);
    } else {
      this.favoritesService.addFavorite(meal.idMeal);
    }
  }
}
