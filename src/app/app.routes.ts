import { Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';

import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  // {
  //   path: 'dashboard', component: AdminComponent, canActivate: [authGuard]
  // }
];
