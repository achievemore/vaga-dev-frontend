import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AuthService } from './shared/services/auth.service';

function initializeApp(authService: AuthService) {
    return () => authService.verificacaoInicialAutenticacao();
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom([HttpClientModule, NgxWebstorageModule.forRoot()]),
        provideAnimations(),
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AuthService],
            multi: true,
        },
    ],
};
