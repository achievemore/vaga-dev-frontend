import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReqresService {
  urlApi = 'https://reqres.in/api/login';
  constructor(private http: HttpClient) { }

  postLogin(body: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.urlApi}`, body);
  }

}
