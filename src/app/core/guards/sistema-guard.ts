import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthState } from "../../shared/states/auth.state";

export const canActivateSistema: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authState = inject(AuthState);
    const router = inject(Router);
    if (!authState.estaAutenticado()) {
        authState.desautenticar();
        router.navigate(['/login']);
        return false;
    }
    return true;
};