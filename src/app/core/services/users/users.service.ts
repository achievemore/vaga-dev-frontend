import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs';
import { IUsers } from '../../../interface/Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.baseUrl;

  public changedUsers$:Subject<IUsers> = new Subject();

  constructor(private http:HttpClient) { }

  getUsers(page:number = 1, per_page:number = 6):void {
    const url = `${this.apiUrl}users?page=${page}&per_page=${per_page}`
     this.http.get<IUsers>(url)
     .subscribe({next:(res) => {
      this.changedUsers$.next(res);
     },
    error:(err) => {
      this.changedUsers$.error(err)
    }})
  }
}
