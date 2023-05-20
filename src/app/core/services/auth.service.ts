import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError} from 'rxjs/operators';

import { LocalStorageService } from 'ngx-webstorage';
import { environment as ENV } from '@environments/environment';
import {
  ForgotPasswordPayload,
  FromOutSide,
  ResetPasswordPayload,
  TokenAuth,
  User,
  UserLoggedIn,
  UserPayload,
  ValidateEmailPayload,
  ValitedToken,
  responseResultEnum,
} from '@core/models/interfaces';
import { BaseResult, TypePropertyLocalStorage } from '@core/models/enums';
import { LoadingService } from '@core/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _api = `${ENV.webApi}/v2/user`;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private storage: LocalStorageService
  ) {}

  authenticate(payload: UserPayload): Observable<UserLoggedIn> {
    const URL = `${this._api}/authenticate`;
    return this.http.post<UserLoggedIn>(URL, payload);
  }

  startForgotPassword(
    payload: ForgotPasswordPayload
  ): Observable<responseResultEnum> {
    const URL = `${this._api}/startForgotPassword`;
    return this.http.post<responseResultEnum>(URL, payload);
  }

  checkEmail(email: string): Observable<FromOutSide> {
    const URL = `${this._api}/fromoutside`;
    return this.http.get<FromOutSide>(URL, {
      params: { email: email },
    });
  }

  startMigration(
    email: string,
    isFromMobile: boolean
  ): Observable<responseResultEnum> {
    const URL = `${this._api}/startUserMigration`;
    return this.http.post<responseResultEnum>(URL, {
      email: email,
      isFromMobile: isFromMobile,
    });
  }

  userTokenValidation(payload: ValidateEmailPayload): Observable<ValitedToken> {
    const URL = `${this._api}/userTokenValidation`;
    return this.http.post<ValitedToken>(URL, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        this.loadingService.hide();
        throw error;
      })
    )
  }

  resetPasswordAndAuthenticate(
    payload: ResetPasswordPayload
  ): Observable<UserLoggedIn> {
    const URL = `${this._api}/resetPasswordAndAuthenticate`;
    return this.http.post<UserLoggedIn>(URL, payload);
  }

  migrateAndAuthenticate(
    payload: ResetPasswordPayload
  ): Observable<UserLoggedIn> {
    const URL = `${this._api}/migrateAndAuthenticate`;
    return this.http.post<UserLoggedIn>(URL, payload);
  }

  registerAndAuthenticate(payload: FormData): Observable<UserLoggedIn> {
    const URL = `${this._api}/registerAndAuthenticate`;
    return this.http.post<UserLoggedIn>(URL, payload);
  }

  refreshToken(token: string): Observable<UserLoggedIn> {
    const URL = `${this._api}/refresh-token`;
    return this.http
      .post<UserLoggedIn>(URL, { refreshToken: token })
      .pipe(tap((response: UserLoggedIn) => this.rewriteToken(response)));
  }

  saveTokenStorage(token: TokenAuth): void {
    this.storage.store(TypePropertyLocalStorage.ENLACE_TOKEN, token);
  }

  saveUserStorage(user: User): void {
    this.storage.store(TypePropertyLocalStorage.USER, user);
  }

  private rewriteToken(response: UserLoggedIn): UserLoggedIn {
    if (response.result.resultEnum === BaseResult.OK)
      this.saveTokenStorage({
        jwtToken: response.jwtToken,
        refreshToken: response.refreshToken,
      });
    return response;
  }
}
