import { ApplicationConfig, importProvidersFrom  } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation()), 
    importProvidersFrom(HttpClientModule)]
};
