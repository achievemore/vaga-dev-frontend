import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./core/auth/pages/login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'dashboard',
      loadComponent: () => import('./core/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      canActivate: [authGuard]
  },
     
      
]

export const APP_PROVIDERS = [
    provideHttpClient()
  ];