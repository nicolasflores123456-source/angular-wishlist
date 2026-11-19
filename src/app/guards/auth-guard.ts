import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(Auth);
  const router = inject(Router);

  // Comprobar si el usuario inició sesión
  if (auth.isLoggedIn()) {
    return true;
  }

  // Si no inició sesión, enviarlo al Login
  return router.createUrlTree(['/login']);
};