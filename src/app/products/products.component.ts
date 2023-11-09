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
  public text = "True";
  public page = 0;
  public limit = "15";
  public controlSearch = new FormControl("");

  private readonly unSubscribe$$ = new Subject<void>();



  constructor(private service: BackendService,
    private cdr: ChangeDetectorRef,
    private readonly fb: FormBuilder){
    const body: PaginationData = {
      limit: this.limit,
      page: this.page
    };
    service.getProducts$(body)
    .pipe(takeUntil(this.unSubscribe$$))
    .subscribe((date) => {this.products = date.products; console.log(this.products); this.cdr.detectChanges();});
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
    body.page = ((val*parseInt(this.limit)) + parseInt(this.limit));
    this.service.getProducts$(body)
      .subscribe((data) => {
         this.products = data.products;
         this.cdr.detectChanges();
    });
    this.page++;
  }

  public skipProductDown(val: number): void{
    if (val !== 0 || val !< 0)
    {
      const body: PaginationData = {
        limit: this.limit,
        page: this.page
      };     
      body.page = ((val*parseInt(this.limit)) - parseInt(this.limit));
      this.service.getProducts$(body)
      .subscribe((data) => {
        this.products = data.products;
        this.cdr.detectChanges();
      });
      this.page--;
    }    
  }

  public changeText(tx: string, id: number): void{
    // if (this.products.find((x) => x.id === id))
  }

  public addData(): void{
    this.products.push();
  }
}
