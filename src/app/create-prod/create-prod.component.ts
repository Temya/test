import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BackendService } from "../backend.service";
import { Product } from "../interface/product";

@Component({
  selector: "app-create-prod",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./create-prod.component.html",
  styleUrls: ["./create-prod.component.scss"]
})
export class CreateProdComponent implements OnInit{

  public product?: Product;
  public formCreate?: FormGroup;

  constructor(private readonly router: Router, private readonly fb: FormBuilder, private service: BackendService){}

  public addProduct(): void{
    if (this.formCreate?.valid){
      this.product = this.formCreate?.getRawValue();
      this.service.createProduct(this.product as Product);
      console.log("Do" + this.service.getProducts());
      this.router.navigateByUrl("products");
    }
  }

  public ngOnInit(): void {
    this.formCreate = this.fb.group({
      id: this.fb.control(this.service.getProducts().length + 1),
      title: this.fb.control("", Validators.required),
      description: this.fb.control("", Validators.required),
      price: this.fb.control("", Validators.required),
      brand: this.fb.control("", Validators.required),
      category: this.fb.control("", Validators.required)
    }); 
  }

}
