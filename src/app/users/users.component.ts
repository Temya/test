import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { BackendService } from "../backend.service";
import { Active } from "../interface/active";
import { PaginationData } from "../interface/pagination-data";
import { UserData } from "../interface/user-data";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnDestroy {

  public page = 0;
  public limit = "10";
  public users: UserData[] = [];
  public active: Active[] = [{ id: 0, name: "+"}, { id: 1, name: "+"}, { id: 2, name: "+"}, { id: 3, name: "+"}, { id: 4, name: "+"}, { id: 5, name: "+"}, { id: 6, name: "+"}, { id: 7, name: "+"}, { id: 8, name: "+"}, { id: 9, name: "+"}];
  public controlSearch = new FormControl("");
  
  private readonly unSubscribe$$ = new Subject<void>();
    
    constructor(private service: BackendService,
        private cdr: ChangeDetectorRef,
        private readonly fb: FormBuilder){
          const body: PaginationData = {
            limit: this.limit,
            page: this.page
          };
        service.getUsers$(body).
        pipe(takeUntil(this.unSubscribe$$))
        .subscribe((date) => {this.users = date.users; console.log(this.users); this.cdr.detectChanges();});
        this.controlSearch.valueChanges
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe((val) => service.gerSearchUsers$(val as string).subscribe((data) => {
        this.users = data.users;
        this.cdr.detectChanges();
      }));
    }

    public ngOnDestroy(): void {
        this.unSubscribe$$.next();
        this.unSubscribe$$.complete();
    }

    public skipProductUp(val: number): void{
      const body: PaginationData = {
        limit: this.limit,
        page: this.page
      };
      body.page = ((val*parseInt(this.limit)) + parseInt(this.limit));
      this.service.getUsers$(body)
        .subscribe((data) => {
           this.users = data.users;
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
        this.service.getUsers$(body)
        .subscribe((data) => {
          this.users = data.users;
          this.cdr.detectChanges();
        });
        this.page--;
      }    
    }

    public changeActive(id: number): void{
      if (this.active[id].name === "+")
      {
        this.active[id].name = "-";
      }
      else {
        this.active[id].name = "+";
      }
    }
}
