import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {WeatherForecast} from './weather-forecast';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // ptz
  lat = 61.784912;
  lon = 34.346909;

  private appid = '219dac16ae099a4d920875fa36ca88bc';
  private url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&appid=${this.appid}&exclude={current,minutely,hourly,alerts}`;

  // weather forecast period
  readonly period = 7;


  constructor(private http: HttpClient) {
  }

  getWeatherForecast(): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(this.url).pipe(catchError(() => throwError('Some goes wrong; try again later')));
  }
}
