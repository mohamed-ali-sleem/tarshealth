import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import * as Highcharts from 'highcharts';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  userName: string = "Mohamed Ali";
  isCollapsed = true;
  isCollapsed1 = true;
  foldersList: any[] = [];
  expandedIndex = -1;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<any>("assets/data/folders.json").subscribe((data) => {
      console.log(data);
      this.foldersList = data;
    });
  }

  Collaps(index: number) {  
    this.expandedIndex = index === this.expandedIndex ? -1 : index;  
  }
}
