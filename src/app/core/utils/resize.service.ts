import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, fromEvent, takeUntil } from 'rxjs';
import { BreakpointDevice } from '@enums/constants.enum';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  private unsubscribe$ = new Subject();
  private windowSize$ = new BehaviorSubject<number>(window.innerWidth);

  constructor() {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.windowSize$.next(window.innerWidth);
      });
  }

  get currentSize(): number {
    return this.windowSize$.value;
  }

  get isMobileBreakpoint(): boolean {
    return this.currentSize < BreakpointDevice.TABLET;
  }

  get isTabletBreakpoint(): boolean {
    return this.currentSize >= BreakpointDevice.TABLET && this.currentSize <= BreakpointDevice.DESKTOP;
  }

  get isDesktopBreakpoint(): boolean {
    return this.currentSize > BreakpointDevice.DESKTOP;
  }

  get size$(): Observable<number> {
    return this.windowSize$.asObservable();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }

}
