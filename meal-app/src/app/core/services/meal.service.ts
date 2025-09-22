import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories.php`);
  }

  getMealsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/filter.php?c=${category}`);
  }

  searchMeals(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search.php?s=${name}`);
  }

  getMealDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lookup.php?i=${id}`);
  }
}
