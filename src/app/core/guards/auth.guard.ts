import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (authService.isloggedin("token")) {
    return true;
  }

  authService.redirectLogin();
  return false;
};
