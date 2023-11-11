import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ActivePipe } from "../active.pipe";
import { BackendService } from "../backend.service";
import { PaginationData } from "../interface/pagination-data";
import { UserData } from "../interface/user-data";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ActivePipe],
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnDestroy {

  public page = 0;
  public limit = 10;
  public users: UserData[] = [];
  public controlSearch = new FormControl("");
  
  private readonly unSubscribe$$ = new Subject<void>();
    
    constructor(
      private service: BackendService,
      private cdr: ChangeDetectorRef,
      private readonly fb: FormBuilder){
        const body: PaginationData = {
          limit: this.limit,
          page: this.page
        };
      service.getUsers$(body)
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe((date) => {
        this.users = date.users.map((user) => ({...user, active: true}));
        service.saveUsers(this.users);
        console.log(this.users);
        this.cdr.detectChanges();
      });
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

    public skipProductUp(val: number): void {
      const body: PaginationData = {
        limit: this.limit,
        page: this.page
      };
      body.page = ((val*this.limit) + this.limit);
      this.service.getUsers$(body)
      .subscribe((data) => {
        if (data.users.length){
          this.users = data.users.map((user) => ({...user, active: true}));
          console.log(this.users);
          this.service.saveUsers(this.users);
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
        this.service.getUsers$(body)
        .subscribe((data) => {
          this.users = data.users.map((user) => ({...user, active: true}));
          this.service.saveUsers(this.users);
          this.cdr.detectChanges();
        });
        this.page--;
      }    
    }

    public changeActive(id: number): void{
      if (this.users[(id - this.page*this.limit) - 1].active === true)
      {
        this.users[(id - this.page*this.limit) - 1].active = false;
      }
      else
      {
        this.users[(id - this.page*this.limit) - 1].active = true;
      }
    }
}
