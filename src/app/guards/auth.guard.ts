import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sesionActiva = localStorage.getItem('sesionActiva') === 'true';
  if (!sesionActiva) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
