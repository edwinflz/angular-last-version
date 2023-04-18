import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from 'ngx-webstorage';
import { MODAL_CONFIG } from '@constants/modal-config.constants';
import { COUNTRIES_LIST } from '@constants/country.constant';
import { FADE_IN_OUT } from '@animations/fadeInOut.animation';
import { CountryTimeZone } from '@interfaces/country.interface';
import { PopupHeader } from '@interfaces/header.interface';
import { User } from '@interfaces/user.interface';
import { TypePropertyLocalStorage } from '@enums/localstorage.enum';
import { ModalClassName } from '@enums/class-elements.enum';
import { BreakpointDevice } from '@enums/constants.enum';
import { AppRoutes } from '@enums/routes.enum';
import { SettingService } from '@services/setting.service';
import { UserService } from '@services/user.service';
import { ResizeService } from '@utils/resize.service';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { SearchGeneralComponent } from '@components/search-general/search-general.component';
import { LoginModalComponent } from '@components/login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, SearchGeneralComponent, LoginModalComponent],
  animations: [FADE_IN_OUT],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  @LocalStorage(TypePropertyLocalStorage.USER) private _user!: User;

  imgLogo: string = 'assets/images/svg/logoEplus.svg';
  imgClosePopup: string = 'assets/images/svg/close_prev_detail.svg';
  imgUserDefault: string = 'assets/images/svg/user.svg';
  icon = 'isotipo'
  popup: PopupHeader = {
    openMore: false,
    openMenu: false,
    openSearch: false,
    openLogin: false
  }
  countrySelected!: CountryTimeZone;
  animate = false;
  timeoutId: any | undefined;

  private _region: string = 'world';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public resizeService: ResizeService,
    private settingService: SettingService,
    private userService: UserService
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

  get isUserLoggedIn(): boolean {
    return this.userService.isUserLoggedIn;
  }

  get profileImage(): string {
    return (this._user && this._user.imageAvatar && this._user.imageAvatar.url) || this.imgUserDefault;
  }

  selectCountryTimezone(): void {
    this.countrySelected = this.selectCountryTimeZone();
    this.settingService.geoLocationIp().subscribe((location: string) => {
      if (location && location.length > 0) {
        this._region = location;
        this.countrySelected = this.selectCountryTimeZone();
      }
    });
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

  selectCountryTimeZone(): CountryTimeZone {
    return COUNTRIES_LIST.find(country => country.value === this._region) || COUNTRIES_LIST[0];
  }

  showLoginOptions(): void {
    if (this.isUserLoggedIn)
      this.togglePopup('openLogin');
    else
      this.modalService.open(LoginModalComponent, { ...MODAL_CONFIG, modalDialogClass: ModalClassName.LOGIN });
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
