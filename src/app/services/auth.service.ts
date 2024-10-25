import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  HttpClient = inject(HttpClient);
  baseUrl = 'https://reqres.in/api';

  constructor() {}

  login(data: any) {
    return this.HttpClient.post(`${this.baseUrl}/login`, data)
    .pipe(tap((result) => {
      localStorage.setItem('authUser', JSON.stringify(result));
    }));
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }
}
