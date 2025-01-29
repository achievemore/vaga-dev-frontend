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

    setToken(value: string) {
        this._token = value;
        this.localService.store('token', this._token);
    }

    get usuario(): string {
        return this._usuario;
    }

    setUsuario(value: string) {
        this._usuario = value;
        this.localService.store('usuario', this._usuario);
    }
}