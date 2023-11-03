import { Routes } from "@angular/router";

export const appRoutes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "autorization"},
    {path: "autorization", loadComponent: () => import("./authorization/authorization.component").then((i) => i.AuthorizationComponent)}
];