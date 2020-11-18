export interface WeatherForecast {
  daily: [
    WeatherForecastDaily,
    WeatherForecastDaily,
    WeatherForecastDaily,
    WeatherForecastDaily,
    WeatherForecastDaily,
    WeatherForecastDaily,
    WeatherForecastDaily
  ];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

export type WeatherForecastDaily = {
  clouds: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  temp: WeatherForecastDailyTemp
};

export type WeatherForecastDailyTemp = {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
};
