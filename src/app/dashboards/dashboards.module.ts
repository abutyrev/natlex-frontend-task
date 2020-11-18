import { NgModule } from '@angular/core';
import { DashboardsComponent } from './dashboards/dashboards.component';
import {DashboardsRoutingModule} from './dashboards-routing.module';
import {ChartsModule} from 'ng2-charts';
import {SharedModule} from '../shared/shared.module';
import { DashboardsChartComponent } from './dashboards-chart/dashboards-chart.component';
import { DashboardsAddChartDialogComponent } from './dashboards-add-chart-dialog/dashboards-add-chart-dialog.component';



@NgModule({
  declarations: [DashboardsComponent, DashboardsChartComponent, DashboardsAddChartDialogComponent],
  imports: [
    DashboardsRoutingModule,
    ChartsModule,
    SharedModule
  ]
})
export class DashboardsModule { }
