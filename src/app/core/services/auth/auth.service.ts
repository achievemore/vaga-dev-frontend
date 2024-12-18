import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { IAuth } from "../../../interface/Auth";
import { map, Observable } from "rxjs";
import { LocalStorageService } from "ngx-webstorage";

@Injectable({
  providedIn: "any",
})
export class AuthService {
  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  login(data: IAuth): Observable<null> {
    const url = `${this.apiUrl}login`;

    return this.http.post<IAuth>(url, data).pipe(
      map((res) => {
        this.storage.store('token', res.token)
        this.storage.store('email', data.email)
        return null;
      })
    );
  }

  isLoggedId(key:string):boolean {
    return this.storage.retrieve(key) ? true : false;
  }

}
