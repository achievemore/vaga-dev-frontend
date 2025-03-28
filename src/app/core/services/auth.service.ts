
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    isAuthenticated(): Observable<boolean> {
        const isLoggedIn = !!sessionStorage.getItem('token');
        return of(isLoggedIn);
    }

    logout() {
        sessionStorage.removeItem('token');
    }
}