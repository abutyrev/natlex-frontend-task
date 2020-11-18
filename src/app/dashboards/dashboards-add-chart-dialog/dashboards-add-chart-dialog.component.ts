import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Sensors} from '../sensors.enum';
import {ChartConfig, ChartType} from '../chart';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboards-add-chart-dialog',
  templateUrl: './dashboards-add-chart-dialog.component.html',
  styleUrls: ['./dashboards-add-chart-dialog.component.scss']
})
export class DashboardsAddChartDialogComponent implements OnInit {
  availableSensors = [
    {
      id: Sensors.Humidity,
      text: 'Humidity'
    },
    {
      id: Sensors.Clouds,
      text: 'Clouds'
    },
    {
      id: Sensors.Pressure,
      text: 'Pressure'
    },
    {
      id: Sensors.Temp,
      text: 'Temperature'
    },
    {
      id: Sensors.WindSpeed,
      text: 'Wind speed'
    }
  ];

  availableTypes: ChartType[] = [
    'line',
    'bar'
  ];

  activeSensors!: FormControl;

  constructor(public dialogRef: MatDialogRef<DashboardsAddChartDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ChartConfig) {
  }

  ngOnInit(): void {
    this.activeSensors = new FormControl(this.data.sensors, Validators.required);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    if (this.activeSensors.invalid) {
      return;
    }

    this.dialogRef.close(Object.assign(this.data, {sensors: this.activeSensors.value}));
  }

}
