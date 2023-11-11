import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { BackendService } from "../backend.service";
import { PaginationData } from "../interface/pagination-data";
import { Product } from "../interface/product";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent {

  public products: Product[] = [];
  public page = 0;
  public limit = 15;
  public controlSearch = new FormControl("");

  private readonly unSubscribe$$ = new Subject<void>();



  constructor(private service: BackendService,
    private cdr: ChangeDetectorRef,
    private readonly fb: FormBuilder){
    const body: PaginationData = {
      limit: this.limit,
      page: this.page
    };
    if (!service.products.length)
    {
      service.getProducts$(body)
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe((date) => {
      this.products = date.products;
      service.saveProd(this.products);
      this.cdr.detectChanges();
    });
    }
    else {
      this.products = service.products;
    }
    
    this.controlSearch.valueChanges
    .pipe(takeUntil(this.unSubscribe$$))
    .subscribe((val) => service.gerSearchProduct$(val as string).subscribe((data) => {
      this.products = data.products;
      this.cdr.detectChanges();
    }));
  }

  public skipProductUp(val: number): void{
    const body: PaginationData = {
      limit: this.limit,
      page: this.page
    };
    body.page = ((val*this.limit) + this.limit);
    this.service.getProducts$(body)
    .subscribe((data) => {
      if (data.products.length){
        this.products = data.products;
        this.service.saveProd(this.products);
        this.page++;
        this.cdr.detectChanges();
      }
    });
  }

  public skipProductDown(val: number): void{
    if (val !== 0 || val !< 0)
    {
      const body: PaginationData = {
        limit: this.limit,
        page: this.page
      };     
      body.page = ((val*this.limit) - this.limit);
      this.service.getProducts$(body)
      .subscribe((data) => {
        this.products = data.products;
        this.service.saveProd(this.products);
        this.cdr.detectChanges();
      });
      this.page--;
    }    
  }

  public addData(): void{
    this.service.pages = "create";
  }

  public editData(id: number): void{
    this.service.pages = "edit";
    this.service.id = id;
  }
}
