import {Injectable} from '@angular/core';
import {WeatherService} from './weather.service';
import {WeatherForecast} from './weather-forecast';
import {ChartConfig, ChartData, ChartType} from './chart';
import {Sensors} from './sensors.enum';
import {ChartDataSets} from 'chart.js';
import {UtilityService} from '../shared/utility.service';
import {DateTime, Interval} from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {
  forecastLoading = false;
  forecastError = false;
  charts: ChartData[] = [];
  weatherData: WeatherForecast | null = null;
  readonly initialTimePeriod!: Date[];


  constructor(private weatherService: WeatherService, private utilityService: UtilityService) {
    this.initialTimePeriod = this.getInitialTimePeriod();
  }

  addChart(chartConfig: ChartConfig): void {
    this.charts = [...this.charts, this.getChartData(chartConfig)];
  }

  getWeatherForecast(): void {
    this.forecastLoading = true;
    this.weatherService.getWeatherForecast().subscribe(data => {
      this.weatherData = data;
      if (this.forecastError) {
        this.forecastError = false;
      }
    }, () => {
      this.forecastError = true;
      this.forecastLoading = false;
      this.weatherData = null;
    }, () => {
      this.forecastLoading = false;
    });
  }

  getChartData(chartConfig: ChartConfig): ChartData {
    const timePeriod = this.getInitialTimePeriod();
    const data = {
      datasets: chartConfig.sensors.map(id => this.getSensorDataset(id)),
      labels: this.getChartLabels(timePeriod),
      options: {
        responsive: true,
      },
      chartType: chartConfig.type,
    };

    return {
      id: this.utilityService.genId(),
      ...data,
      period: this.getInitialTimePeriod(),
      isFilled: false
    };
  }

  getSensorDataset(id: Sensors): ChartDataSets {
    let data;
    let label;

    switch (id) {
      case Sensors.WindSpeed:
        data = this.weatherData?.daily.map(d => d.wind_speed);
        label = 'Wind speed';
        break;
      case Sensors.Temp:
        data = this.weatherData?.daily.map(d => d.temp.max);
        label = 'Temperature';
        break;
      case Sensors.Pressure:
        data = this.weatherData?.daily.map(d => d.pressure);
        label = 'Pressure';
        break;
      case Sensors.Clouds:
        data = this.weatherData?.daily.map(d => d.clouds);
        label = 'Clouds';
        break;
      case Sensors.Humidity:
        data = this.weatherData?.daily.map(d => d.humidity);
        label = 'Humidity';
        break;
    }

    return {data, label, fill: false};
  }

  getChartLabels(period: Date[]): string[] {
    return period.map(i => i.toLocaleString().substr(0, 10));
  }

  getInitialTimePeriod(): Date[] {
    const period = [];
    const currentDay = new Date(Date.now()).getDate();

    for (let i = 0; i < this.weatherService.period; i++) {
      const date = new Date(Date.now());
      date.setDate(currentDay + i);
      period.push(date);
    }

    return period;
  }

  getTimePeriod(start: Date, end: Date): Date[] {
    const interval = Interval.fromDateTimes(DateTime.fromISO(start.toISOString()), DateTime.fromISO(end.toISOString()))
      .toDuration('days').toObject().days as number;
    const firstDay = start.getDate();
    const period = [];

    for (let i = 0; i <= interval; i++) {
      const date = new Date(Date.parse(start.toLocaleString()));
      date.setDate(firstDay + i);
      period.push(date);
    }

    return period;
  }

  deleteChart(id: string): void {
    this.charts = this.charts.filter(c => c.id !== id);
  }

  updateChartPeriod({id, start, end}: { id: string, start: Date, end: Date }): void {
    const chart = this.charts.find(c => c.id === id);
    if (chart) {
      chart.period = this.getTimePeriod(start, end);
      chart.labels = this.getChartLabels(chart.period);
    }
  }

  toggleChartFill(id: string, bool: boolean): void {
    const chart = this.charts.find(c => c.id === id);
    if (chart) {
      chart.datasets = chart.datasets.map(dts => {
        dts.fill = bool;
        return dts;
      });
      chart.isFilled = bool;
    }
  }

  changeChartType(id: string, type: ChartType): void {
    const chart = this.charts.find(c => c.id === id);
    if (chart) {
      chart.chartType = type;
    }
  }
}
