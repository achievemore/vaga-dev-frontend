import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import {
  provideNgxWebstorage,
  withLocalStorage,
  withNgxWebstorageConfig,
  withSessionStorage,
} from "ngx-webstorage";
import { routes } from "./app.routes";
import { pt_BR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(pt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ":", caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage()
    ), provideNzI18n(pt_BR), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(),
  ],
};
