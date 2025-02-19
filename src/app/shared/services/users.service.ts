import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface users {
  avatar?: string,
  email?: string,
  first_name?: string,
  id?: number,
  last_name?: string,
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  urlApi = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi);
  }

}
