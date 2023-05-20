import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from 'ngx-webstorage';

import { STEPS_AUTH } from '@constants/authentication.constants';
import { MODAL_CONFIG, PATH_MOBILE } from '@constants/index';
import { ErrorFormAuth, ForgotPasswordPayload, ResetPasswordPayload, SendFormData, UrlAuthParameters, UserLoggedIn, UserPayload, FormDataAuth } from '@interfaces/index';
import { AppRoutes, BaseResult, BodyClassName, BreakpointDevice, EmailRoutes, MobileRedirectRoutes,
  ModalClassName, StepAuth, TypeFieldsForm, TypePropertyLocalStorage } from '@enums/index';
import { DomManipulateService, ResizeService, LoadingService } from '@utils/index';
import { buildNewAccount, handledAsyncFunction, isStringAndNotEmpty, readUrlAuthParameters, resolveUrl, transformToChangePassword } from '@shared/helpers';
import { PrivacyPoliciesModalComponent } from '@components/privacy-policies/privacy-policies-modal/privacy-policies-modal.component';
import { FaqModalComponent } from '@components/faq/faq-modal/faq-modal.component';
import { AuthService } from '@services/auth.service';

import { BreadcrumbAuthService } from './services/breadcrumb-auth.service';
import { AuthBreadcrumbComponent } from './auth-breadcrumb/auth-breadcrumb.component';
import { AuthResponseModalComponent } from './auth-response-modal/auth-response-modal.component';
import { AuthFormComponent } from './auth-form/auth-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    NgbModalModule,
    AuthResponseModalComponent,
    AuthBreadcrumbComponent,
    AuthFormComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BreadcrumbAuthService],
})
export class AuthComponent implements OnInit, OnDestroy  {

  stepAuth = StepAuth.AUTH;
  authSteps = STEPS_AUTH;
  email: string = '';
  errorForm!: ErrorFormAuth | null;
  userName!: string;
  emailSupportRoute: string = EmailRoutes.SUPPORT;
  faqRoute: string = `/${AppRoutes.FAQ}`;
  domManipulateService = inject(DomManipulateService);
  breadcrumbService = inject(BreadcrumbAuthService);
  loadingService = inject(LoadingService);
  router = inject(Router);
  authService = inject(AuthService);
  resizeService = inject(ResizeService);
  breadcrumb$ = this.breadcrumbService.breadcrumb$;
  itemGoBack$ = this.breadcrumb$.pipe(map((items) => items.find((item) => item.canClick)));
  @LocalStorage(TypePropertyLocalStorage.PREVIEW_URL) private _previewURL!: string;
  private _urlparameters: UrlAuthParameters = readUrlAuthParameters();

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.domManipulateService.removeBodyClass(BodyClassName.LOGIN_BODY);
  }

  get isWebview(): boolean {
    return this._urlparameters.fromWebview;
  }

  get canShowCancelLogin$(): Observable<boolean> {
    return this.resizeService.size$
      .pipe(
        map(value => value < BreakpointDevice.TABLET),
        map(isMobile => isMobile ? this.areMainSteps() : true)
      );
  }

  checkEmail(event: SendFormData): void {
    this.email = event.data.email as string;
    this.authService.checkEmail(this.email).subscribe(response =>
     response.result.resultEnum === BaseResult.OK
       ? this.changeStepAuth(StepAuth.CHECK_PASSWORD)
       : this.handleResponseApi(response.result.resultEnum)
    );
  }

  authenticate(event: SendFormData): void {
    const { password } = event.data;
    this.authService
      .authenticate({ email: this.email, password } as UserPayload)
      .subscribe((response) =>
        response.result.resultEnum === BaseResult.OK
          ? this.userLoggedInSuccess(response)
          : this.setErrorForm(TypeFieldsForm.PASSWORD, response.result.resultEnum)
      );
  }

  startMigration(): void {
    this.authService.startMigration(this.email, this.isWebview).subscribe(({result}) =>
      (result.resultEnum === BaseResult.OK)
      ? this.isWebview
        ? this.redirectToMobile(`${PATH_MOBILE}${MobileRedirectRoutes.USER_STARTS_MIGRATION}`)
        : this.handleResponseModal(BaseResult.USER_NEEDS_MIGRATE)
      : this.handleResponseModal(result.resultEnum)
    )
  }

  sendEmailForgotPassword(event: SendFormData) {
    const { email } = event.data;
    this.email = email as string;
    this.authService.startForgotPassword({email, isFromMobile: this.isWebview} as ForgotPasswordPayload)
      .subscribe(({ result }) =>
      (result.resultEnum === BaseResult.OK)
        ? this.isWebview
          ? this.redirectToMobile(`${PATH_MOBILE}${MobileRedirectRoutes.USER_FORGOT_PASSWORD}`)
          : this.handleResponseModal(BaseResult.SEND_EMAIL_FORGOT_PASSWORD)
        : result.resultEnum === BaseResult.USER_NEEDS_MIGRATE
          ? this.startMigration()
          : this.handleResponseModal(result.resultEnum)
    );
  }

  validateToken(userId: string, token: string): void {
    this.loadingService.show();
    this.authService.userTokenValidation({userId, token}).subscribe((response) => {
      if (response.result.resultEnum === BaseResult.TOKEN_EXPIRED) {
        this.router.navigate([`/${AppRoutes.AUTH}`]);
        this.changeStepAuth(StepAuth.AUTH);
        this.handleResponseModal(response.result.resultEnum);
      }
      if (response.result.resultEnum === BaseResult.OK) {
        this.email = response.email;
        this.userName = response.userName;
        this._urlparameters.actionByUrl === StepAuth.USER_MIGRATION
          ? this.changeStepAuth(StepAuth.RESET_PASSWORD)
          : this.changeStepAuth(StepAuth.CHANGE_PASSWORD);
      }
      this.loadingService.hide();
    });
  }

  restorePasswordAndAuthenticate(event: ResetPasswordPayload): void {
    this.authService
      .resetPasswordAndAuthenticate(event)
      .subscribe(response =>
        response.result.resultEnum === BaseResult.OK
          ? this.isWebview
            ?  this.userLoggedInSuccess(response)
            :  this.userChangedPassword(response, BaseResult.SUCCESSFUL_PASSWORD_CHANGE)
          : this.handleResponseModal(response.result.resultEnum)
      );
  }

  migrateAndAuthenticate(event: ResetPasswordPayload): void {
    this.authService
      .migrateAndAuthenticate(event)
      .subscribe(response =>
        response.result.resultEnum === BaseResult.OK
          ? this.isWebview
            ?  this.userLoggedInSuccess(response)
            :  this.userChangedPassword(response, BaseResult.USER_HAS_BEEN_MIGRATED)
          : this.handleResponseModal(response.result.resultEnum)
      );
  }

  registerAndAuthenticate(event: SendFormData): void {
    this.email = event.data.email as string;
    const payload = buildNewAccount(event);
    this.authService
      .registerAndAuthenticate(payload)
      .subscribe(response =>
        response.result.resultEnum === BaseResult.OK
          ? this.redirectToSuscription(response)
          : this.handleResponseApi(response.result.resultEnum)
      );
  }

  changeStepAuth(type: StepAuth | string): void {
    this.stepAuth = type as StepAuth;
    this.breadcrumbService.changeBreadcrumb(this.stepAuth);
  }

  changeStatusBreadCrumb(event: SendFormData): void {
    this.breadcrumbService.changeStatusBreadCrumb(event.step);
  }

  setErrorForm(input: string, errorEnum: number, anotherInput?: string): void {
    this.errorForm = { input, errorEnum, anotherInput };
  }

  userChangedPassword(response: UserLoggedIn, resultEnum: number): void {
    this.handleResponseModal(resultEnum);
    this.userLoggedInSuccess(response);
  }

  userLoggedInSuccess(response: UserLoggedIn): void {
    if (this.isWebview) {
      const URL = `${PATH_MOBILE}${MobileRedirectRoutes.USER_LOGGED_IN}?token=${response.jwtToken}&refreshToken=${response.refreshToken}`;
      this.redirectToMobile(URL);
    } else {
      this.saveLocalStorageInfo(response);
      this.redirectToHome();
    }
  }

  openPolicyPrivacyModal(): void {
    this.modalService.open(PrivacyPoliciesModalComponent, { ...MODAL_CONFIG, modalDialogClass: ModalClassName.FAQ, scrollable: true});
  }

  openModalFaq(): void {
    this.modalService.open(FaqModalComponent, { ...MODAL_CONFIG, modalDialogClass: ModalClassName.FAQ, fullscreen: true  });
  }

  transformPayloadPassword(event: SendFormData): void {
    const payload = transformToChangePassword(event, this._urlparameters.mailingUsertoken, this._urlparameters.userId);
    event.step === StepAuth.CHANGE_PASSWORD
      ? this.restorePasswordAndAuthenticate(payload)
      : this.migrateAndAuthenticate(payload);
  }

  redirectToSuscription(response: UserLoggedIn): void {
    this.authService.saveUserStorage(response.userInfo);
    this.authService.saveTokenStorage({ jwtToken: response.jwtToken, refreshToken: response.refreshToken });
    (this.isWebview)
      ? this.router.navigate([AppRoutes.SUBSCRIPTION],
        {
          queryParams: {
            userId: response.userInfo.id,
            fromMobile: true,
            jwtToken: response.jwtToken,
            refreshToken: response.refreshToken,
            expirationToken: response.expirationToken
          }
        })
      : this.router.navigate([AppRoutes.SUBSCRIPTION]);
  }

  handleForm(event: SendFormData): void {
    this.changeStatusBreadCrumb(event);
    if (event.step === StepAuth.AUTH)
      this.checkEmail(event);
    if (event.step === StepAuth.CHECK_PASSWORD)
      this.authenticate(event);
    if (event.step === StepAuth.FORGOT_PASSWORD)
      this.sendEmailForgotPassword(event);
    if (event.step === StepAuth.CHANGE_PASSWORD || event.step === StepAuth.RESET_PASSWORD)
      this.transformPayloadPassword(event);
    if (event.step === StepAuth.NEW_ACCOUNT)
      this.registerAndAuthenticate(event);
  }

  handleResponseApi(resultEnum: number): void {
    if (resultEnum === BaseResult.USER_NOT_FOUND || resultEnum === BaseResult.USER_ALREADY_EXISTS) {
      this.handleResponseModal(resultEnum);
    }
    if (resultEnum === BaseResult.USER_NEEDS_MIGRATE) {
      this.startMigration();
    }
  }

  async handleResponseModal(result: number): Promise<void> {
    const MODAL = this.modalService.open(AuthResponseModalComponent, { ...MODAL_CONFIG });
    MODAL.componentInstance.result = result;
    MODAL.componentInstance.email = this.email;
    if (result == BaseResult.USER_NEEDS_MIGRATE || result === BaseResult.SEND_EMAIL_FORGOT_PASSWORD) {
      this.redirectToHome();
    }
    const [RES, ERROR] = await handledAsyncFunction(MODAL.result);
    RES && this.handleResponseOnClosingModal(RES);
  }

  cancelLogin(): void {
    this.isWebview
      ? this.redirectToMobile(`${PATH_MOBILE}${MobileRedirectRoutes.LOGIN_CANCEL}`)
      : this.redirectToHome();
  }

  areMainSteps(): boolean {
    return (
      this.stepAuth === StepAuth.AUTH ||
      this.stepAuth === StepAuth.RESET_PASSWORD ||
      this.stepAuth === StepAuth.CHANGE_PASSWORD
    );
  }

  private handleResponseOnClosingModal(result: number | string): void {
    if (result === StepAuth.NEW_ACCOUNT || result === StepAuth.AUTH)
      this.changeStepAuth(result);
    if (result === StepAuth.FORGOT_PASSWORD)
      this.sendEmailForgotPassword({step: '', data: { email: this.email } as FormDataAuth});
  }

  private redirectToHome(): void {
    const IS_PREVIEW_URL = isStringAndNotEmpty(this._previewURL);
    if (IS_PREVIEW_URL) {
      const ROUTE = resolveUrl(this._previewURL);
      ROUTE.querys
        ? this.router.navigate([ROUTE.route], {
            queryParams: { ...ROUTE.querys },
          })
        : this.router.navigate([this._previewURL]);
    } else {
      this.router.navigate([`/${AppRoutes.HOME}`]);
    }
  }

  private redirectToMobile(url: string): void {
    window.location.href = url;
  }

  private saveLocalStorageInfo(response: UserLoggedIn): void {
    this.authService.saveUserStorage(response.userInfo);
    const { jwtToken, refreshToken } = response;
    this.authService.saveTokenStorage({ jwtToken, refreshToken });
  }

  private init(): void {
    this.domManipulateService.addBodyClass(BodyClassName.LOGIN_BODY);
    this._urlparameters.actionByUrl === StepAuth.USER_MIGRATION || this._urlparameters.actionByUrl === StepAuth.FORGOT_PASSWORD
      ? this.validateToken(this._urlparameters.userId, this._urlparameters.mailingUsertoken)
      : this.changeStepAuth(this.stepAuth);
  }
}
