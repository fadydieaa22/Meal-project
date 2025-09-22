import { Routes } from '@angular/router';

// Use loadComponent for standalone components
import { NoAuthGuard } from './core/guards/no-auth-guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'meals',
    loadComponent: () => import('./meals/meals-list/meals-list').then((m) => m.MealsListComponent),
  },
  {
    path: 'meal/:id',
    loadComponent: () =>
      import('./meals/meal-details/meal-details').then((m) => m.MealDetailsComponent),
  },
  {
    path: 'meals/:id',
    loadComponent: () =>
      import('./meals/meal-details/meal-details').then((m) => m.MealDetailsComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then((m) => m.Login),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register').then((m) => m.Register),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites-list/favorites-list').then((m) => m.FavoritesListComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.HomeComponent),
  },
  { path: '**', redirectTo: '' },
];
