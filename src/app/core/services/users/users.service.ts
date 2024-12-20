import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUsers } from '../../../interface/Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.baseUrl;

  public changedUsers$:Subject<IUsers> = new Subject();

   public loading$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) { }

  getUsers(page:number = 1, per_page:number = 6):void {
    const url = `${this.apiUrl}users?page=${page}&per_page=${per_page}`

    this.loading$.next(true);

     this.http.get<IUsers>(url)
     .subscribe({next:(res) => {
      this.loading$.next(false);
      this.changedUsers$.next(res);
     },
    error:(err) => {
      this.loading$.next(false);
      this.changedUsers$.error(err)
    }})
  }
}
