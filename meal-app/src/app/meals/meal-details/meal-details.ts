import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MealService } from '../../core/services/meal.service';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.html',
  styleUrl: './meal-details.css',
  standalone: true,
  imports: [CommonModule],
})
export class MealDetailsComponent implements OnInit {
  meal: any = null;
  ingredients: string[] = [];
  // ...existing code...

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.mealService.getMealDetails(id).subscribe((res: any) => {
          if (res.meals && res.meals.length > 0) {
            this.meal = res.meals[0];
            this.ingredients = this.extractIngredients(this.meal);
          }
        });
      }
    });
  }

  extractIngredients(meal: any): string[] {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient}${measure ? ' - ' + measure : ''}`);
      }
    }
    return ingredients;
  }

  isFavorite(meal: any): boolean {
    return this.favoritesService.isFavorite(meal.idMeal);
  }

  toggleFavorite(meal: any): void {
    if (this.isFavorite(meal)) {
      this.favoritesService.removeFavorite(meal.idMeal);
    } else {
      this.favoritesService.addFavorite(meal.idMeal);
    }
  }
}
