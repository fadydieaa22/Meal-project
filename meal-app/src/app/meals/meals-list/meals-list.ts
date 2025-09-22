import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MealService } from '../../core/services/meal.service';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.html',
  styleUrls: ['./meals-list.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class MealsListComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string = '';
  searchQuery: string = '';
  pagedMeals: any[] = [];
  allMeals: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  // ...existing code...

  constructor(
    private mealService: MealService,
    public favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.searchMeals();
  }

  loadCategories(): void {
    this.mealService.getCategories().subscribe((res: any) => {
      this.categories = res.categories ? res.categories.map((cat: any) => cat.strCategory) : [];
      if (this.categories.length > 0) {
        this.selectedCategory = this.categories[0];
        this.selectCategory(this.selectedCategory);
      }
    });
  }

  selectCategory(category: string): void {
    this.currentPage = 1;
    this.searchMeals();
  }

  searchMeals(): void {
    if (this.searchQuery) {
      this.mealService.searchMeals(this.searchQuery).subscribe((res: any) => {
        const meals = res.meals || [];
        this.allMeals = meals;
        this.totalPages = Math.max(1, Math.ceil(meals.length / 10));
        this.goToPage(1);
      });
    } else {
      this.mealService.getMealsByCategory(this.selectedCategory).subscribe((res: any) => {
        const meals = res.meals || [];
        this.allMeals = meals;
        this.totalPages = Math.max(1, Math.ceil(meals.length / 10));
        this.goToPage(1);
      });
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const start = (page - 1) * 10;
    const end = start + 10;
    this.pagedMeals = this.allMeals.slice(start, end);
  }

  openMeal(idMeal: string): void {
    this.router.navigate(['/meals', idMeal]);
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
