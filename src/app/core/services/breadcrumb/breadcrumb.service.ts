import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';
interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

 // Subject
 private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

 // Observable
 readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

 constructor(private router: Router) {
   this.router.events
     .pipe(filter((event) => event instanceof NavigationEnd))
     .subscribe((event) => {
       const root = this.router.routerState.snapshot.root;
       const breadcrumbs: Breadcrumb[] = [];
       this.addBreadcrumb(root, [], breadcrumbs);

       this._breadcrumbs$.next(this.listRemoveDuplicated(breadcrumbs));
     });
 }

 private addBreadcrumb(
   route: ActivatedRouteSnapshot,
   parentUrl: string[],
   breadcrumbs: Breadcrumb[]
 ) {
   if (route) {
     const routeUrl = parentUrl.concat(route.url.map((url) => url.path));
     if (route.data['breadcrumb']) {
       const breadcrumb = {
         label: this.getLabel(route.data),
         url: '#',
       };

       breadcrumbs.push(breadcrumb);
     }
     this.addBreadcrumb(route.firstChild as ActivatedRouteSnapshot, routeUrl, breadcrumbs);
   }
 }

 private listRemoveDuplicated(breadcrumbs: Array<Breadcrumb>) {
   let list:Array<Breadcrumb> = [];

   breadcrumbs.forEach((item) => {
     let duplicated =
     list.findIndex((value) => {
         return item.url == value.url;
       }) > -1;

     if (!duplicated) {
       list.push(item);
     }
   });

   return list;
 }

 private getLabel(data: Data) {
   return data['breadcrumb']
 }
}
