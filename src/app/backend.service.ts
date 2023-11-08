import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Users } from "./interface/users";

@Injectable({
  providedIn: "root"
})
export class BackendService {

  constructor(private readonly http: HttpClient) { }

  // public getProducts$(val: PaginationData): Observable<Products> {
  //   if (val.limit === "0" || val.limit === "")
  //     { val.limit = "10";}
  //   const url = `/api/products?limit=${val.limit}&skip=${val.page}&select=${ProductFileConfig.join(",")}`;
  //   return this.http.get<Products>(url, { withCredentials: true });
  // }

  public getUsers$(): Observable<Users> {
    const url = "/api/users?&select=firstName,password,age,phone,birthDate,gender";
    return this.http.get<Users>(url, { withCredentials: true });
  }
}
