import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        
    },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
    { path: 'user', loadChildren: () => import('./pages/user/user.routes').then(m => m.USER_ROUTES) },
    { path: 'users', loadChildren: () => import('./pages/users/users.routes').then(m => m.USERS_ROUTES) },
    { path: '**', loadChildren: () => import('./pages/no-page/no-page.routes').then(m => m.NOPAGE_ROUTES)},
];
