import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { IUsers } from '../../../interface/Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.baseUrl;

  public changedUsers$:Subject<IUsers> = new Subject();

  constructor(private http:HttpClient) { }

  getUsers():void {
    const url = `${this.apiUrl}users`

     this.http.get<IUsers>(url)
     .subscribe({next:(res) => {
      this.changedUsers$.next(res);
     }})
  }
}
