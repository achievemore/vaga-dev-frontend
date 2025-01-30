import { Inject, inject, Injectable, Signal, signal } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";

@Injectable({
    providedIn: 'root'
})
export class AuthState {
    private _token = '';
    private _usuario = '';

    private localService = inject(LocalStorageService);

    get token(): string {
        return this._token;
    }

    get usuario(): string {
        return this._usuario;
    }

    autenticar(value: { token: string; usuario: string; }): void {
        const { token, usuario } = value;
        this._token = token;
        this.localService.store('token', this._token);
        this._usuario = usuario;
        this.localService.store('usuario', this._usuario);
    }

    desautenticar(): void {
        this._token = '';
        this.localService.clear('token');
        this._usuario = '';
        this.localService.clear('usuario');
    }

    estaAutenticado(): boolean {
        if (this._token && this.usuario) return true;
        return false;
    }
}