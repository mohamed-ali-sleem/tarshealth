import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = null;
  chartData = [];
  seriesData;
  xAxisData;
  dataSelected: boolean = false;
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  drawChart() {
    this.dataSelected = true;
    this.httpClient.get<any>("assets/data/weather.json").subscribe((data) => {
      console.log(data);
      let _self = this;
      _self.xAxisData = data[0]["data"];
      _self.seriesData = data;
      this.chartOptions = {
        chart: {
          type: "column",
        },
        title: {
          text: "Monthly Average Rainfall",
        },

        xAxis: {
          categories: _self.xAxisData,
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: "Rainfall (mm)",
          },
        },
        tooltip: {
          headerFormat:
            '<span style = "font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
            '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: "Tokyo",
            data: _self.seriesData[1]["data"],
          },
          {
            name: "New York",
            data:_self.seriesData[2]["data"]
          },
          {
            name: "London",
            data: _self.seriesData[3]["data"]
          },
          {
            name: "Berlin",
            data: _self.seriesData[4]["data"]
          },
        ],
      };
    });
  }
}
