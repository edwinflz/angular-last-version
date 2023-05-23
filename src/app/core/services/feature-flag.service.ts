import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '@environments/environment';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { FeatureFlagStatus } from '@interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {

  private _api = `${ENV.webApi}/v2/EnableFeatures`;
  private _featureStatus: FeatureFlagStatus[] = [];
  private _featureStatus$: Observable<FeatureFlagStatus[]> | undefined;

  constructor(private http: HttpClient) { }

  get featureStatus$(): Observable<FeatureFlagStatus[]> {
    if (!this._featureStatus$) {
      this._featureStatus$ = this.getAllFeaturesStatus().pipe(
        shareReplay(1)
      );
    }
    return this._featureStatus$;
  }

  private getAllFeaturesStatus(): Observable<FeatureFlagStatus[]> {
    return this.http.get<FeatureFlagStatus[]>(this._api + '/GetAllFeaturesStatus/')
    .pipe(tap(flags => this._featureStatus = flags));
  }

  checkFeatureOn(featureName: string): boolean {
    const feature = this._featureStatus.find((item: FeatureFlagStatus) => item.feature === featureName)!;
    return feature && feature.status;
  }

  fillFeaturesFlags(result: FeatureFlagStatus[]): void {
    this._featureStatus = result;
  }

}
