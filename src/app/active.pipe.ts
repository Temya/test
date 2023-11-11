import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "active",
  standalone: true
})
export class ActivePipe implements PipeTransform {

  public transform(value: boolean): unknown {
    return value ? "Активен": "Не активен";
  }

}
