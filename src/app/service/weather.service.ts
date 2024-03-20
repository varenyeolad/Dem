// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class WeatherService {
//   private apiKey = '56247f5389361227099573d66a8bdadc';
//   private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

//   constructor(private http: HttpClient) {}

//   getWeatherData(city: string): Observable<any> {
//     const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}`;
//     return this.http.get(url);
//   }
// }
