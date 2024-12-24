import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        /* canActivate: [AuthGuard] */
      },
      /* {
        path: 'users',
        component: UsersListComponent,
        canActivate: [AuthGuard]
      }, */
      {
        path: '**',
        redirectTo: 'login'
      }
];
