import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from './classes';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(): Observable<City> {
    return this.http.get<any>('http://localhost:8000/weather-sites');
  }

  refreshWeather(): Observable<any> {
    return this.http.post<any>('http://localhost:8000/refresh-weather', {});
  }

  addSite(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/add-site', data);
  }
}