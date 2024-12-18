import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import {
  provideNgxWebstorage,
  withLocalStorage,
  withNgxWebstorageConfig,
  withSessionStorage,
} from "ngx-webstorage";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ":", caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage()
    ),
  ],
};
