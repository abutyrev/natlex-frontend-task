import {Sensors} from './sensors.enum';
import {ChartDataSets, ChartOptions} from 'chart.js';

export type ChartType = 'line' | 'bar';

export type ChartConfig = {
  type: ChartType,
  sensors: Sensors[]
};

export type ChartData = {
  id: string;
  datasets: ChartDataSets[],
  labels: string[],
  options: ChartOptions,
  chartType: ChartType,
  period: Date[],
  isFilled?: boolean
};
