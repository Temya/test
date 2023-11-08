import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { BackendService } from "../backend.service";
import { Product } from "../interface/product";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent {

  public products: Product[] = [];

  private readonly unSubscribe$$ = new Subject<void>();

  constructor(private service: BackendService, private cdr: ChangeDetectorRef){
    service.getProducts$().
    pipe(takeUntil(this.unSubscribe$$))
    .subscribe((date) => {this.products = date.products; console.log(this.products); this.cdr.detectChanges();});
  }

}
