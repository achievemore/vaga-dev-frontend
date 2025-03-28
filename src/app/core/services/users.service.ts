import { Injectable } from '@angular/core';
import { UserListResponse } from '../models/user-list-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly apiUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.apiUrl}/users?page=${page}`);
  }

}
