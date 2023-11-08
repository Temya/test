import { NgSwitch, NgSwitchDefault, NgSwitchCase } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { BackendService } from "./backend.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    standalone: true,
    imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet],
    providers: [BackendService, HttpClient],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public title = "test";
}
