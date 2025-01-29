import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../models/login.request';
import { catchError, Observable, of } from 'rxjs';
import { LoginDto } from '../models/login.dto';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private readonly url = 'https://reqres.in/api/login';

    private httpClient = inject(HttpClient);

    login(
        request: LoginRequest
    ): Observable<LoginDto> {

        return this.httpClient.post<LoginDto>(
            this.url, request)
            .pipe(
                catchError((res: HttpErrorResponse) => {
                    console.error(res);
                    return of({ error: res.error.error });
                })
            );
    }
}
