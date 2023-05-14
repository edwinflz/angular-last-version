import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { URLS_HTTP_LOADING_IGNORE } from '@constants/url-specials.constants';
import { HttpLoadingService } from '@utils/http-loading.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

  private _countRequest = 0;
  private _ignoreUrl = URLS_HTTP_LOADING_IGNORE;

  constructor(private httpLoadingService: HttpLoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.canIgnoreUrl(req)) return next.handle(req);

    if (!this._countRequest) this.httpLoadingService.show();
    this._countRequest++;

    return next.handle(req).pipe(finalize(() => {
      this._countRequest--;
      if (!this._countRequest) this.httpLoadingService.hide();
    }));
  }

  private canIgnoreUrl(request: HttpRequest<any>): boolean {
    return this._ignoreUrl.some(element => request.url.includes(element));
  }
}
