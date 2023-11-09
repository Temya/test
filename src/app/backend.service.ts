import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginationData } from "./interface/pagination-data";
import { Product } from "./interface/product";
import { Products } from "./interface/products";
import { Users } from "./interface/users";

@Injectable({
  providedIn: "root"
})
export class BackendService {

  public products: Product[] = [];

  constructor(private readonly http: HttpClient) { }

  public getProducts$(val: PaginationData): Observable<Products> {
    if (val.limit === "0" || val.limit === "")
      { val.limit = "10";}
    const url = `/api/products?limit=${val.limit}&skip=${val.page}&select=title,description,price,brand,category`;
    return this.http.get<Products>(url, { withCredentials: true });
  }

  public getUsers$(val: PaginationData): Observable<Users> {
    if (val.limit === "0" || val.limit === "")
      { val.limit = "10";}
    const url = `/api/users?limit=${val.limit}&skip=${val.page}&select=firstName,password,age,phone,birthDate,gender`;
    return this.http.get<Users>(url, { withCredentials: true });
  }

  public gerSearchProduct$(word: string): Observable<Products> {
    const url = `/api/products/search?q=${word}`;
    return this.http.get<Products>(url, { withCredentials: true});
  }

  public gerSearchUsers$(word: string): Observable<Users> {
    const url = `/api/users/search?q=${word}`;
    return this.http.get<Users>(url, { withCredentials: true});
  }

  public saveProd(prod: Product[]): void{
    this.products = prod;
  }

  public getProducts(): Product[]{
    return this.products;
  }

  public createProduct(x: Product): void{
    this.products.push(x);
  }
}