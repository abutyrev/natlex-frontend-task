import {Component, OnInit} from '@angular/core';
import {DashboardsService} from '../dashboards.service';
import {MatDialog} from '@angular/material/dialog';
import {DashboardsAddChartDialogComponent} from '../dashboards-add-chart-dialog/dashboards-add-chart-dialog.component';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit {

  constructor(private dashboardsService: DashboardsService, public addDialog: MatDialog) {
  }

  get charts(): any {
    return this.dashboardsService.charts;
  }

  get forecastLoading(): boolean {
    return this.dashboardsService.forecastLoading;
  }

  get forecastError(): boolean {
    return this.dashboardsService.forecastError;
  }

  get hasDataToShow(): boolean {
    return !!this.dashboardsService.weatherData;
  }

  ngOnInit(): void {
    if (!this.hasDataToShow) {
      this.dashboardsService.getWeatherForecast();
    }
  }

  openAddDialog(): void {
    const dialogRef = this.addDialog.open(DashboardsAddChartDialogComponent, {
      width: '250px',
      data: {
        type: 'line',
        sensors: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dashboardsService.addChart(result);
      }
    });
  }

}
