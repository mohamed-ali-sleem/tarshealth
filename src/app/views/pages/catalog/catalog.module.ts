import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';

// Ng-ApexCharts
import { HighchartsChartModule } from "highcharts-angular";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CatalogComponent } from "./catalog.component";
import { ListComponent } from "./list/list.component";
import { DetailsComponent } from "./details/details.component";
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: "",
    component: CatalogComponent,
    children: [
      {
        path: "",
        component: ListComponent,
      },
      {
        path: "details",
        component: DetailsComponent,
      },
      {
        path: "new",
        component: AddComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [CatalogComponent, ListComponent, DetailsComponent, AddComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeahterIconModule,
    HighchartsChartModule,
    NgbModule,
    NgxDatatableModule,
    NgSelectModule
  ],
  providers: [HttpClient],
})
export class CatalogModule {}
