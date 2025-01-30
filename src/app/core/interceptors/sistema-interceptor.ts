import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthState } from "../../shared/states/auth.state";

export const sistemaInterceptor: HttpInterceptorFn = (req, next) => {
    const token = inject(AuthState).token;
    const auth = req.clone({
        headers:
            req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(auth);
};