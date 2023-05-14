import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreadCrumbAuth } from '@interfaces/authentication.interface';
import { StepAuth } from '@enums/authentication.enum';
import { BREADCRUMB_AUTH_DATA } from '@constants/authentication.constants';

@Injectable()
export class BreadcrumbAuthService {
  private _breadcrumb: BreadCrumbAuth[] = [];
  private _breadcrumbSubject$ = new BehaviorSubject<BreadCrumbAuth[]>(this._breadcrumb);

  constructor() { }

  get breadcrumb$(): Observable<BreadCrumbAuth[]> {
    return this._breadcrumbSubject$.asObservable();
  }

  changeBreadcrumb(type: StepAuth): void {
    this._breadcrumb = [];
    this._breadcrumb.push(...BREADCRUMB_AUTH_DATA[type]);
    this.next(this._breadcrumb);
  }

  changeStatusBreadCrumb(type: string): void {
    const COPY_BREADCRUMB = this.copyDeep();
    COPY_BREADCRUMB.map((item) => {
      if (item.type === type)
        item.statusCheked = true;
      return item;
    });
    this.next(COPY_BREADCRUMB);
  }

  private copyDeep(): BreadCrumbAuth[] {
    const CLONE_BREADCRUMB: BreadCrumbAuth[] = [];
    this._breadcrumb.map(item => CLONE_BREADCRUMB.push({...item}));
    return CLONE_BREADCRUMB;
  }

  private next(breadcrumb: BreadCrumbAuth[]): void {
    this._breadcrumbSubject$.next(breadcrumb);
  }

}
