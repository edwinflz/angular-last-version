import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { TypePropertyLocalStorage } from '@enums/localstorage.enum';
import { TokenAuth } from '@interfaces/authentication.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @LocalStorage(TypePropertyLocalStorage.ENLACE_TOKEN) private _enlaceToken!: TokenAuth;

  constructor() { }

  get isUserLoggedIn(): boolean {
    return this._enlaceToken && !!this._enlaceToken.jwtToken;
  }

}
