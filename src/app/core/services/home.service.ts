import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IResponseListUsers } from '../../modules/shared/interfaces/home.interface';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    constructor(public httpClient: HttpClient) { }

    listUsers(page: number) {
        return this.httpClient.get<IResponseListUsers>(`${environment.urlReqres}/users?page=${page}`);
    }
}
