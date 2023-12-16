import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { LocalService } from './local.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const localStorageService = inject(LocalService);
  const routeService = inject(Router);
  const userData = localStorageService?.getData('userData');
  if (userData) {
    return true;
  }
  let isAllowed = false;
  authService.isLoggedIn$.subscribe((val) => {
    isAllowed = val;
  });
  if (isAllowed) {
    return true;
  }
  routeService.navigateByUrl('/login');
  return isAllowed;
};
