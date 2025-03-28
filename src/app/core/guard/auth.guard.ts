// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  
  if (authService.isAuthenticated()) {
    return true;
  } else {
    authService.redirectToLogin();
    return false;
  }
};