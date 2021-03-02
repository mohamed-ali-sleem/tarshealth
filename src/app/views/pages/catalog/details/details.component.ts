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

  filters = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
  ];
  chart;
  updateFromInput = false;
  chartConstructor = "chart";
  chartCallback;
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
      text: "",
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
          ["Male", 15654],
          ["Female", 60000],
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
      text: "",
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
          ["Male", 45.0],
          ["Female", 26.8],
        ],
        
      },
    ],
  };

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor() {
    const self = this;

    this.fetch((data) => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });

    // saving chart reference using chart callback
    this.chartCallback = chart => {
      self.chart = chart;
    };
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

  fetchMale(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/data/100-male.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  onChange($event) {
    // this.chartOptions.series[0].data =345345;
    const self = this;
    self.updateFromInput = true;
    self.chartOptions.series = [
      {
        name: "Test",
        data: [
          ["Male", 3000],
          ["Female", 2000],
        ],
      },
    ];
    self.chartOptions2.series = [
      {
        type: "pie",
        name: "New Browser share",
        data: [
          ["Male", 567.0],
          ["Female", 234.8],
        ],
      },
    ]

    this.fetchMale((data) => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }
}
