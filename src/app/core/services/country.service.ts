import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '@environments/environment';
import { Observable } from 'rxjs';
import { Country, CountryWithCode, Department, District, State } from '@interfaces/country.interface';
import { ResponseSoaApi } from '@interfaces/soa-api.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private API = `${ENV.webApi}/v2/country`;
  private soaApi = `${ENV.soaApiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getCountriesLite(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.API}/list/lite`);
  }

  getCountriesWithCode(): Observable<CountryWithCode[]> {
    return this.http.get<CountryWithCode[]>(`${this.API}/countryWithCodes`);
  }

  getStates(countryCode: string = 'us'): Observable<State[]> {
    return this.http.get<State[]>(`${this.API}/${countryCode}/states?orderBy=nameenlgish`);
  }

  getDepartments(stateCode: string = 'us'): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.API}/${stateCode}/departments?orderBy=nameenlgish`);
  }

  getDistricts(departmentCode: string): Observable<District[]> {
    return this.http.get<District[]>(`${this.API}/${departmentCode}/districts?orderBy=nameenlgish`);
  }

  // TODO: Necesito tipar estos endpoints
  getCountryStateCommunity(countryId: string): Observable<ResponseSoaApi<any>> {
    const url = `${this.soaApi}Country/getStatesByCountry/${countryId}`;
    return this.http.get<ResponseSoaApi<any>>(url);
  }

  getDialCodeByCountryId(countryId: string): Observable<ResponseSoaApi<any>> {
    const url = `${this.soaApi}Country/getDialCode/${countryId}`;
    return this.http.get<ResponseSoaApi<any>>(url);
  }

  getDialCode(): Observable<ResponseSoaApi<any>> {
    const url = `${this.soaApi}Country/dialcodes/`;
    return this.http.get<ResponseSoaApi<any>>(url);
  }
}
