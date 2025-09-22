import { CanActivateFn } from '@angular/router';

export const NoAuthGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('authToken');
  return !isLoggedIn;
};
