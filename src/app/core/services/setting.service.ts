import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {

  private API_V2 = `${ENV.webApi}/v2/setting`;

  constructor(private http: HttpClient) {}

  geoLocationIp(): Observable<string> {
    return this.http.get(`${this.API_V2}/geolocationip`, { responseType: 'text' });
  }
}
