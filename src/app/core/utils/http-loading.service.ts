import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpLoadingService {

  private _httpLoading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  get isLoading$(): Observable<boolean> {
    return this._httpLoading$.asObservable();
  }

  show(): void {
    this.change(true);
  }

  hide(): void {
    this.change(false);
  }

  change(event: boolean): void {
    this._httpLoading$.next(event);
  }
}
