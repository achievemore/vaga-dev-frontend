import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./core/auth/pages/login/login.component').then(m => m.LoginComponent)
      },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
]
