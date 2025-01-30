import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../../shared/states/auth.state';

export const canAutenticacao: CanActivateFn = (route, state) => {
    const authState = inject(AuthState);
    const router = inject(Router);

    if (authState.estaAutenticado()) {
        router.navigate(['/sistema']); // Redireciona se já estiver autenticado
        return false;
    }
    return true;
};