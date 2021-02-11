import { Component, OnInit } from "@angular/core";




@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.scss"],
  preserveWhitespaces: true,
})
export class CatalogComponent implements OnInit {
  userName: string = "Mohamed Ali";
  public isCollapsed = false;
  constructor() {}

  ngOnInit(): void {}
}
