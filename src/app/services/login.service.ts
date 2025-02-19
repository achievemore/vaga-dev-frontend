import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestLogin, IResponseLogin } from '../modules/shared/interfaces/login.interface';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(public httpClient: HttpClient) { }

    login(body: IRequestLogin) {
        return this.httpClient.post<IResponseLogin>(`${environment.urlReqres}/login`, body);
    }
}
