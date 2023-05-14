import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { STEPS_AUTH } from '@constants/authentication.constants';
import { MODAL_CONFIG } from '@constants/modal-config.constants';
import { ErrorFormAuth, SendFormData, UrlAuthParameters } from '@interfaces/index';
import { AppRoutes, BodyClassName, EmailRoutes, ModalClassName, StepAuth } from '@enums/index';
import { DomManipulateService } from '@utils/index';
import { BreadcrumbAuthService } from './services/breadcrumb-auth.service';
import { AuthBreadcrumbComponent } from './auth-breadcrumb/auth-breadcrumb.component';
import { AuthResponseModalComponent } from './auth-response-modal/auth-response-modal.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { FaqModalComponent } from '@components/faq/faq-modal/faq-modal.component';

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
  canShowCancelLogin!: boolean;
  errorForm!: ErrorFormAuth | null;
  userName!: string;
  isMobile!: boolean;
  emailSupportRoute: string = EmailRoutes.SUPPORT;
  faqRoute: string = `/${AppRoutes.FAQ}`;
  email!: string;
  domManipulateService = inject(DomManipulateService);
  breadcrumbService = inject(BreadcrumbAuthService);
  breadcrumb$ = this.breadcrumbService.breadcrumb$;
  itemGoBack$ = this.breadcrumb$.pipe(map((items) => items.find((item) => item.canClick)));
  private _isMobile!: boolean;
  private _urlparameters!: UrlAuthParameters;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.domManipulateService.addBodyClass(BodyClassName.LOGIN_BODY);
    this.init();
  }

  ngOnDestroy(): void {
    this.domManipulateService.removeBodyClass(BodyClassName.LOGIN_BODY);
  }

  changeStepAuth(type: StepAuth | string): void {
    this.stepAuth = type as StepAuth;
    this.breadcrumbService.changeBreadcrumb(this.stepAuth);
    this.showCancelLogin(this.isMobile);
  }

  showCancelLogin(isMobile: boolean): void {
    this.canShowCancelLogin = isMobile ? this.areMainSteps() : true;
  }

  areMainSteps(): boolean {
    return (
      this.stepAuth === StepAuth.AUTH ||
      this.stepAuth === StepAuth.RESET_PASSWORD ||
      this.stepAuth === StepAuth.CHANGE_PASSWORD
    );
  }

  cancelLogin(): void {
    // this.redirectToHome();
  }

  changeStatusBreadCrumb(event: SendFormData): void {
    this.breadcrumbService.changeStatusBreadCrumb(event.step);
  }

  createNewUser(event: SendFormData): void {
    this.changeStatusBreadCrumb(event);
    // console.log(event, 'event');
  }

  restorePasswordAndAuthenticate(event: SendFormData): void {
    this.changeStatusBreadCrumb(event);
    event.step === StepAuth.CHANGE_PASSWORD
    // ? (this.restorePassword.emit(
    //     transformToChangePassword(event, this._urlparameters.mailingUsertoken, this._urlparameters.userId)
    //   ))
    // : (this.migratePassword.emit(
    //     transformToChangePassword(event, this._urlparameters.mailingUsertoken, this._urlparameters.userId)
    //   ));
  }

  openPolicyPrivacyModal(): void {
    // this.modalService.open(PrivacyPoliciesModalComponent, { ...MODAL_CONFIG, modalDialogClass: ModalClassName.FAQ, scrollable: true});
  }

  openModalFaq(): void {
    this.modalService.open(FaqModalComponent, { ...MODAL_CONFIG, modalDialogClass: ModalClassName.FAQ });
  }

  private init(): void {
    this.changeStepAuth(this.stepAuth)
  }
}
