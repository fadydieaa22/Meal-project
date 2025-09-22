import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('authToken');

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
