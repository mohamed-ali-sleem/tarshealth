import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { Options } from "highcharts/highstock";
import { ColumnMode } from "@swimlane/ngx-datatable";

import highcharts3D from "highcharts/highcharts-3d";
import Cylinder from "highcharts/modules/cylinder";
import Funnel3d from "highcharts/modules/funnel3d";
import { CatalogService } from "../service/catalog.service";

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
  categories = [
    { id: 0, name: "procedures", isActive: true },
    { id: 1, name: "conditions", isActive: false },
    { id: 2, name: "medications", isActive: false },
  ];
  isLoading = false;
  selectedTab;
  filters = {
    procedure: null,
    condition: null,
    medication: null
  }

  procedure: any;
  condition: any;
  medication: any;


  patientList = []

  subCategotyList = [];
  chart;
  updateFromInput = false;
  chartConstructor = "chart";
  chartCallback;
  searchQuery = '';
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
    ],
  };

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(private _catalogService: CatalogService) {
    const self = this;

    // saving chart reference using chart callback
    this.chartCallback = chart => {
      self.chart = chart;
    };
  }

  ngOnInit(): void {
    this.changeCategory({ id: 0, name: "procedures", isActive: true })
    this.getPatients()
  }


  changeCategory(tab) {
    this.selectedTab = tab
    console.log(tab);
    this.categories.forEach(element => {
      element.isActive = false
    });
    this.categories[tab.id].isActive = true;
    this._catalogService.getFilters(tab.name).subscribe(res => {
      console.log(res);
      this.subCategotyList = [...res.data];

    }, err => {
      console.log(err);

    })
  }


  getPatients(filters = {}) {
    this.isLoading = true
    this._catalogService.getPatientList(filters).subscribe(res => {
      console.log(res);
      this.isLoading = false
      this.patientList = [...res.data];
      const self = this;
      self.updateFromInput = true;
      self.chartOptions.series = [
        {
          type: "funnel3d",
          name: "Patients",
          data: [555, res.data.length],
        },
      ];
    }, err => {
      console.log(err);
      this.isLoading = false

    })
  }


  chageSubFilters(sub: any) {
    switch (this.selectedTab.name) {
      case 'procedures':
        // code block
        this.procedure = sub
        this.filters.procedure = this.procedure._id
        break;
      case 'conditions':
        // code block
        this.condition = sub
        this.filters.condition = this.condition._id
        break;
      default:
        // code block
        this.medication = sub
        this.filters.medication = this.medication._id
    }
    this.getPatients(this.filters)
  }

  clearFilter(val) {
    this.filters[val] = null;
    this[val] = null;
    this.getPatients(this.filters)
  }
}
