import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { distinctUntilChanged, filter } from 'rxjs';
import { NgClass } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { IBreadCrumb } from './models/breadcrumb.model';
import { AuthState } from '../../shared/states/auth.state';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
    selector: 'app-sistema-layout',
    standalone: true,
    imports: [
        RouterOutlet,
        MenuComponent,
        BreadcrumbModule,
        NgClass,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        OverlayPanelModule
    ],
    templateUrl: './sistema-layout.page.html',
    styleUrl: './sistema-layout.page.scss',
    providers: [

    ]
})
export class SistemaLayoutPage {

    breadCrumb: IBreadCrumb[] = [];

    constructor(
        private route: Router,
        private cdr: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        protected authState: AuthState
    ) {
        this.route.events.pipe(
            filter((event) => event instanceof NavigationEnd || event instanceof NavigationStart),
            distinctUntilChanged(),
        ).subscribe(
            {
                next: () => {
                    this.breadCrumb = this.buildBreadCrumb(this.activatedRoute.root);
                    this.cdr.detectChanges();
                },
            }
        );
    }

    buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
        let label = route.routeConfig && route.routeConfig.title ? route.routeConfig.title : '';
        let path = route.routeConfig && route.routeConfig.title ? route.routeConfig.path : '';
        const lastRoutePart = path!.split('/').pop();
        const isDynamicRoute = lastRoutePart!.startsWith(':');
        if (isDynamicRoute && !!route.snapshot) {
            const paramName = lastRoutePart!.split(':')[1];
            path = path!.replace(lastRoutePart!, route.snapshot.params[paramName]);
            label = route.snapshot.params[paramName];
        }
        const nextUrl = path ? `${url}/${path}` : url;

        const breadcrumb: IBreadCrumb = {
            label: label as string,
            url: nextUrl,
        };
        const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
        if (route.firstChild) {
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }

    sair(): void {
        this.authState.desautenticar();
        this.route.navigate(['/login']);
    }
}
