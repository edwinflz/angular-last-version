import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment as ENV } from '@environments/environment';
import { CatalogViewModel,  CatalogViewModelPaging, CatalogViewModelPagingRequest } from '@interfaces/catalog.interface';
@Injectable({
  providedIn: 'root',
})
export class CatalogService {

  private API_V2 = `${ENV.webApi}/v2/catalog`;
  private cacheHomeCatalogs:CatalogViewModelPaging = {} as CatalogViewModelPaging;

  constructor(private http: HttpClient) {}

  getListHomeCatalogs(request: CatalogViewModelPagingRequest): Observable<CatalogViewModelPaging> {
    return this.cacheHomeCatalogs && this.cacheHomeCatalogs.catalogs.length > 0
      ? of(this.cacheHomeCatalogs)
      : this.http
          .post<CatalogViewModelPaging>(
            `${this.API_V2}/public/view`,
            request
          )
          .pipe(
            tap((response: CatalogViewModelPaging) =>
              this.cacheHomeCatalogs = response
            )
          );
  }
}
