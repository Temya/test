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
export class EditProdComponent implements OnInit{

  public formEdit?: FormGroup;

  constructor(private readonly router: Router,
    private service: BackendService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute){}

  public saveProduct(): void {
    this.service.updateProduct(this.formEdit?.getRawValue(), this.service.id as number);
    this.service.pages = "products";
  }
  
  public ngOnInit(): void {
    const id = this.service.id;
    const product = this.service.getProductEdit(id as number);
    this.formEdit = this.fb.group({
      title: this.fb.control(product?.title, Validators.required),
      description: this.fb.control(product?.description, Validators.required),
      price: this.fb.control(product?.price, Validators.required)
    });
  }

}
