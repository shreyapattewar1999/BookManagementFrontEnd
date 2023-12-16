import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LocalService } from './local.service';

export const AdminGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalService);
  const userData = localStorageService.getData('userData');
  // const userData: any = JSON.parse(localStorage?.getItem('userData')!);

  if (userData) {
    return userData.isAdmin;
  }
  return false;
};
