import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

// Ng2-charts
import { ChartsModule } from 'ng2-charts';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent
  }
]

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeahterIconModule,
    NgbModule,
    NgApexchartsModule,
    ChartsModule
  ]
})
export class CatalogModule { }
