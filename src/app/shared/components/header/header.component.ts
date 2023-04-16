import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { COUNTRIES_LIST } from '@constants/country.constant';
import { FADE_IN_OUT } from '@animations/fadeInOut.animation';
import { CountryTimeZone } from '@interfaces/country.interface';
import { PopupHeader } from '@interfaces/header.interface';
import { BreakpointDevice } from '@enums/constants.enum';
import { AppRoutes } from '@enums/routes.enum';
import { ResizeService } from '@utils/resize.service';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  animations: [FADE_IN_OUT],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  imgLogo: string = 'assets/images/svg/logoEplus.svg';
  imgClosePopup: string = 'assets/images/svg/close_prev_detail.svg';
  imgUserDefault: string = 'assets/images/svg/user.svg';
  icon = 'isotipo'
  popup: PopupHeader = {
    openMore: false,
    openMenu: false,
  }
  countrySelected!: CountryTimeZone;
  animate = false;
  timeoutId: any | undefined;

  private _region: string = 'world';

  constructor(
    private router: Router,
    public resizeService: ResizeService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  get isDesktopBreakpoint$(): Observable<boolean> {
    return this.resizeService.size$.pipe(map(value => value > BreakpointDevice.DESKTOP));
  }

  get isTabletBreakpoint$(): Observable<boolean> {
    return this.resizeService.size$.pipe(map(value => value >= BreakpointDevice.TABLET && value <= BreakpointDevice.DESKTOP));
  }

  get isMobileBreakpoint$(): Observable<boolean> {
    return this.resizeService.size$.pipe(map(value => value < BreakpointDevice.TABLET));
  }

  selectCountryTimezone(): void {
    this.countrySelected = COUNTRIES_LIST.find(x => x.value === this._region) || COUNTRIES_LIST[0];
    // this.settingsService.geolocationip().then((location: string) => {
    //   if (location && location.length > 0) {
    //     this._region = location;
    //     const currentCountry = COUNTRIES_LIST.find(x => x.value === this._region);
    //     this.countrySelected =  !!currentCountry ? currentCountry : COUNTRIES_LIST.find(x => x.value === 'world');
    //   }
    // });
  }

  redirectHome(): void {
    this.router.navigate([AppRoutes.HOME]);
  }

  togglePopup(prop: string): void {
    this.resetPopupOptions(prop);
    this.popup[prop] = !this.popup[prop];
    this.toggleAnimate();
  }

  toggleAnimate(): void {
    this.timeoutId = setTimeout(() => {
      this.animate = true;
    }, 0);
  }

  resetPopupOptions(prop: string): void {
    for (const key of Object.keys(this.popup)) {
      if (prop !== key)
        this.popup[key] = false;
    }
  }

  private init(): void {
    this.selectCountryTimezone();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
