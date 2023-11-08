import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { BackendService } from "../backend.service";
import { UserData } from "../interface/user-data";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnDestroy {

  public users: UserData[] = [];
  
  private readonly unSubscribe$$ = new Subject<void>();
    
    constructor(private service: BackendService,
        private cdr: ChangeDetectorRef){
        service.getUsers$().
        pipe(takeUntil(this.unSubscribe$$))
        .subscribe((date) => {this.users = date.users; console.log(this.users); this.cdr.detectChanges();});
    }

    public ngOnDestroy(): void {
        this.unSubscribe$$.next();
        this.unSubscribe$$.complete();
    }

}
