import { inject, Injectable, Signal, signal } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthState } from '../states/auth.state';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private localService = inject(LocalStorageService);
    private authState = inject(AuthState);

    verificacaoInicialAutenticacao(): void {
        const token = this.localService.retrieve('token');
        const usuario = this.localService.retrieve('usuario');
        if (token && usuario) {
            this.authState.autenticar({ token, usuario });
        } else {
            this.authState.desautenticar();
        }
    }

}
