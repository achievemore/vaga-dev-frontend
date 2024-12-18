import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./pages/auth/auth.routes").then((m) => m.AUTH_ROUTES),
  },
  {
    path: "",
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "/dashboard",
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./pages/dashboard/dashboard.routes").then(
            (m) => m.DASHBOARD_ROUTES
          ),
      },
      {
        path: "user",
        loadChildren: () =>
          import("./pages/user/user.routes").then((m) => m.USER_ROUTES),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./pages/users/users.routes").then((m) => m.USERS_ROUTES),
      },
      {
        path: "**",
        loadChildren: () =>
          import("./pages/no-page/no-page.routes").then((m) => m.NOPAGE_ROUTES),
      },
    ],
    canActivate:[authGuard]
  },
  {
    path: "**",
    loadChildren: () =>
      import("./pages/no-page/no-page.routes").then((m) => m.NOPAGE_ROUTES),
  },
];
