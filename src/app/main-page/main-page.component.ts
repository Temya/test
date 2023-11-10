import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BackendService } from "../backend.service";
import { CategoryComponent } from "../category/category.component";
import { CreateProdComponent } from "../create-prod/create-prod.component";
import { EditProdComponent } from "../edit-prod/edit-prod.component";
import { ProductsComponent } from "../products/products.component";
import { UsersComponent } from "../users/users.component";


@Component({
    selector: "app-main-page",
    standalone: true,
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ProductsComponent,
        UsersComponent,
        CategoryComponent,
        HttpClientModule,
        CreateProdComponent,
        EditProdComponent
    ]
})
export class MainPageComponent {
    
    constructor(public service: BackendService){
        
    }

    public page(str: string): void
    {
        this.service.pages = str;
    }
}

