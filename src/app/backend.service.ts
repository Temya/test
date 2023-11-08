import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Products } from "./interface/products";
import { Users } from "./interface/users";

@Injectable({
  providedIn: "root"
})
export class BackendService {

  constructor(private readonly http: HttpClient) { }

  public getProducts$(): Observable<Products> {
    const url = `/api/products?&select=title,description,price,brand,category,images`;
    return this.http.get<Products>(url, { withCredentials: true });
  }

  public getUsers$(): Observable<Users> {
    const url = "/api/users?&select=firstName,password,age,phone,birthDate,gender";
    return this.http.get<Users>(url, { withCredentials: true });
  }
}
