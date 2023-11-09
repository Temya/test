import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-edit-prod",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./edit-prod.component.html",
  styleUrls: ["./edit-prod.component.scss"]
})
export class EditProdComponent{

  public formEdit?: FormGroup;

  constructor(private readonly router: Router,
    private service: BackendService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute){}

  // public saveProduct(): void{
  //   this.service.updateProduct(this.formEdit?.getRawValue());
  //   this.router.navigateByUrl("products");
  // }
  
  // public ngOnInit(): void {
  //   const id = parseInt(this.route.snapshot.paramMap.get("id") as string);
  //   const product = this.service.getProductEdit(id);
  //       this.formEdit = this.fb.group({
  //         id: this.fb.control(product.id, Validators.required),
  //         title: this.fb.control(product.title, Validators.required),
  //         description: this.fb.control(product.description, Validators.required),
  //         price: this.fb.control(product.price, Validators.required),
  //         brand: this.fb.control(product.brand, Validators.required),
  //         category: this.fb.control(product.category, Validators.required),
  //       });
  // }

}
