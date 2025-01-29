import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page').then(mod => mod.LoginPage)
    }
];
