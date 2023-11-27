import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private kansasApiUrl = 'https://api.weather.gov/gridpoints/TOP/31,80/forecast';
  private columbiaApiUrl = 'https://api.weather.gov/gridpoints/LWX/31,80/forecast';

  constructor(private http: HttpClient) {}

  getWeatherData(identifier: string): Observable<any> {
    if (identifier === 'LWX') {
      return this.http.get<any>(this.columbiaApiUrl);
    } else {
      return this.http.get<any>(this.kansasApiUrl);
    }
  }
}