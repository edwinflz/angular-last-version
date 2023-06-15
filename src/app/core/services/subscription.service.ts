import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '@environments/environment';
import { Observable } from 'rxjs';
import { ListActivePlan } from '@models/interfaces';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private APIV2 = `${ENV.webApi}/v2/chargebee`;
  private APIV3 = `${ENV.webApi}/v3/chargebee`;

  constructor(private http: HttpClient,) { }

  listActivePlans(): Observable<ListActivePlan[]> {
    return this.http.get<ListActivePlan[]>(`${this.APIV2}/listActivePlans`);
  }
}
