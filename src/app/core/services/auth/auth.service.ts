import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { IAuth } from "../../../interface/Auth";
import { BehaviorSubject, catchError, finalize, map, Observable } from "rxjs";
import { LocalStorageService } from "ngx-webstorage";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "any",
})
export class AuthService {
  private apiUrl: string = environment.baseUrl;

  public loading$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private storage: LocalStorageService, private route:Router) {}

  login(data: IAuth): Observable<null> {
    const url = `${this.apiUrl}login`;
    this.loading$.next(true);
    return this.http.post<IAuth>(url, data).pipe(
      map((res) => {
        this.storage.store('token', res.token)
        this.storage.store('email', data.email)
        return null;
      }),
      catchError((err) => {
        this.loading$.next(false)
        throw err
      }),
      finalize(() => {
        this.loading$.next(false)
      })
    );
  }

  isloggedin(key:string):boolean {
    return this.storage.retrieve(key) ? true : false;
  }

  redirectLogin():void {
    this.route.navigateByUrl('/auth');
  }

  logout():void {
    const listKey = ['token','email'];
    listKey.forEach((val:string) => {
      this.storage.clear(val)
    });

    this.redirectLogin();
  }
}
