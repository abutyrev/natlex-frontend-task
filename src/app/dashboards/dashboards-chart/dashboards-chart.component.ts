import {Component, Input, OnInit} from '@angular/core';
import {ChartData} from '../chart';
import {DashboardsService} from '../dashboards.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {ChartType} from '../chart-type.enum';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-dashboards-chart',
  templateUrl: './dashboards-chart.component.html',
  styleUrls: ['./dashboards-chart.component.scss']
})
export class DashboardsChartComponent implements OnInit {
  @Input() data!: ChartData;

  range!: FormGroup;
  min!: Date;
  max!: Date;

  constructor(private dashboardsService: DashboardsService) {
  }

  get canUpdatePeriod(): boolean {
    return this.range.valid
      && (this.range.value.start?.toLocaleString() !== this.data.period[0].toLocaleString()
        || this.range.value.end?.toLocaleString() !== this.data.period[this.data.period.length - 1].toLocaleString());
  }

  get isLineChart(): boolean {
    return this.data.chartType === ChartType.Line;
  }

  ngOnInit(): void {
    this.range = new FormGroup({
      start: new FormControl(this.data.period[0], Validators.required),
      end: new FormControl(this.data.period[this.data.period.length - 1], Validators.required)
    });
    this.min = this.dashboardsService.initialTimePeriod[0];
    this.max = this.dashboardsService.initialTimePeriod[this.dashboardsService.initialTimePeriod.length - 1];
  }

  onDelete(): void {
    this.dashboardsService.deleteChart(this.data.id);
  }

  onUpdateTimePeriod(): void {
    this.dashboardsService.updateChartPeriod({
      id: this.data.id,
      start: this.range.value.start,
      end: this.range.value.end
    });
  }

  onChartFillToggle(change: MatSlideToggleChange): void {
    this.dashboardsService.toggleChartFill(this.data.id, change.checked);
  }

  onChartTypeChange(change: MatSelectChange): void {
    this.dashboardsService.changeChartType(this.data.id, change.value);
  }
}
