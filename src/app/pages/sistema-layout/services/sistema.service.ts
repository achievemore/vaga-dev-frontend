import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ListagemUsuariosRequest } from '../models/listagem-usuarios.request';
import { ListagemUsuariosApiDto } from '../models/listagem-usuarios-api.dto';

@Injectable({
    providedIn: 'root'
})
export class SistemaService {
    private readonly url = 'https://reqres.in/api/users';

    private httpClient = inject(HttpClient);

    obterUsuarios(
        request: ListagemUsuariosRequest
    ): Observable<ListagemUsuariosApiDto> {
        const httpParams = new HttpParams();
        httpParams.set('page', request.page.toString());
        httpParams.set('per_page', request.per_page.toString());
        const options =
            { params: httpParams };
        return this.httpClient.get<ListagemUsuariosApiDto>(
            `${this.url}?per_page=${request.per_page}&page=${request.page}&delay=3`)
            .pipe(
                catchError((res: HttpErrorResponse) => {
                    console.error(res);
                    return of();
                })
            );
    }
}
