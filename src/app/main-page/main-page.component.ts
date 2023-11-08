import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { BackendService } from "../backend.service";
import { CategoryComponent } from "../category/category.component";
import { UserData } from "../interface/user-data";
import { ProductsComponent } from "../products/products.component";
import { UsersComponent } from "../users/users.component";


@Component({
    selector: "app-main-page",
    standalone: true,
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.scss"],
    imports: [
        CommonModule,
        ProductsComponent,
        UsersComponent,
        CategoryComponent,
        HttpClientModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {
    
}

// this.service.getProducts$(body)
//         .pipe(takeUntil(this.unSubscribe$$))
//         .subscribe((data) => {
//           this.products = data.products;
//           productService.saveProducts(this.products);
//           this.cdr.detectChanges();
//         });
