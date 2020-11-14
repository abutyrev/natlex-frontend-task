import { NgModule } from '@angular/core';
import { DashboardsComponent } from './dashboards/dashboards.component';
import {DashboardsRoutingModule} from './dashboards-routing.module';



@NgModule({
  declarations: [DashboardsComponent],
  imports: [
    DashboardsRoutingModule
  ]
})
export class DashboardsModule { }
