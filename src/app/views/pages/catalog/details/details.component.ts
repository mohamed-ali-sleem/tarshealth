import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { Options } from "highcharts/highstock";
import { ColumnMode } from "@swimlane/ngx-datatable";

import highcharts3D from "highcharts/highcharts-3d";
import Cylinder from "highcharts/modules/cylinder";
import Funnel3d from "highcharts/modules/funnel3d";

// Initialize exporting module.
highcharts3D(Highcharts);
Cylinder(Highcharts);
Funnel3d(Highcharts);

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions = {
    chart: {
      type: "funnel3d",
      options3d: {
        enabled: true,
        alpha: 10,
        depth: 50,
        viewDistance: 50,
      },
    },
    title: {
      text: "Highcharts Funnel3D Chart",
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b> ({point.y:,.0f})",
          allowOverlap: true,
          y: 10,
        },
        neckWidth: "30%",
        neckHeight: "25%",
        width: "80%",
        height: "80%",
      },
    },
    series: [
      {
        name: "Unique users",
        data: [
          ["Website visits", 15654],
          ["Downloads", 4064],
          ["Requested price list", 1987],
          ["Invoice sent", 976],
          ["Finalized", 846],
        ],
      },
    ],
  };

  chartOptions2 = {
    chart: {
      plotBorderWidth: null,
      plotShadow: false,
    },
    title: {
      text: "Browser market shares at a specific website, 2014",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}%</b>: {point.percentage:.1f} %",
          style: {
            color: Highcharts.theme || "black",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Browser share",
        data: [
          ["Firefox", 45.0],
          ["IE", 26.8],
          {
            name: "Chrome",
            y: 12.8,
            sliced: true,
            selected: true,
          },
          ["Safari", 8.5],
          ["Opera", 6.2],
          ["Others", 0.7],
        ],
      },
    ],
  };

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor() {
    this.fetch((data) => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }

  ngOnInit(): void {}
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/data/100k.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }
}
