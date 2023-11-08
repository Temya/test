import { Routes } from "@angular/router";

export const appRoutes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "main"},
    {path: "autorization", loadComponent: () => import("./authorization/authorization.component").then((i) => i.AuthorizationComponent)},
    {path: "main", loadComponent: () => import("./main-page/main-page.component").then((i) => i.MainPageComponent)},
    {path: "products", loadComponent: () => import("./products/products.component").then((i) => i.ProductsComponent)},
    {path: "category", loadComponent: () => import("./category/category.component").then((i) => i.CategoryComponent)},
    {path: "users", loadComponent: () => import("./users/users.component").then((i) => i.UsersComponent)}
];