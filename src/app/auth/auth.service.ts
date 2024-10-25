import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  HttpClient = inject(HttpClient);
  baseUrl = 'http://localhost:3000/api';

  constructor() {}

  login(data: any) {
    return this.HttpClient.post(`${this.baseUrl}/login`, data)
    .pipe(tap((result) => {
      localStorage.setItem('authUser', JSON.stringify(result));
    }));
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }
}
