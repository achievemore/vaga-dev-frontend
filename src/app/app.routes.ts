import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    {
        path: 'sistema',
        loadComponent: () => import('./pages/sistema-layout/sistema-layout.page').then(mod => mod.SistemaLayoutPage),
        children: [
            {
                path: '', pathMatch: 'full', redirectTo: 'listagem-usuarios'
            },
            {
                path: 'listagem-usuarios',
                loadComponent: () => import('./pages/sistema-layout/components/listagem-usuarios/listagem-usuarios.component')
                    .then(mod => mod.ListagemUsuariosComponent)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page').then(mod => mod.LoginPage)
    }
];
