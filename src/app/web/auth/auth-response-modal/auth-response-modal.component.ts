import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_CONFIG } from '@constants/modal-config.constants';
import { AppRoutes, BaseResult, BreakpointDevice, EmailRoutes, ModalClassName, StepAuth } from '@core/models/enums';
import { FaqModalComponent } from '@components/faq/faq-modal/faq-modal.component';
import { ResizeService } from '@utils/resize.service';

@Component({
  selector: 'app-auth-response-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-response-modal.component.html',
  styleUrls: ['./auth-response-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthResponseModalComponent {

  @Input() result!: number;
  @Input() email!: string;

  faqRoute: string = AppRoutes.FAQ;
  emailSupport: string = EmailRoutes.SUPPORT;
  newAccount: StepAuth = StepAuth.NEW_ACCOUNT;
  signIn: StepAuth = StepAuth.AUTH;
  sendForgotPassword = StepAuth.FORGOT_PASSWORD;
  fromMainButton: boolean = true;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private resizeService: ResizeService,) { }

  get isMobileBreakpoint$(): Observable<boolean> {
    return this.resizeService.size$.pipe(map(value => value < BreakpointDevice.TABLET));
  }

  get isEmailNotExist(): boolean {
    return this.result === BaseResult.USER_NOT_FOUND;
  }

  get isUserNeedsMigrateFromAnyStep(): boolean {
    return this.result === BaseResult.USER_NEEDS_MIGRATE_FROM_ANY_STEP;
  }

  get isUserNeedsMigrate(): boolean {
    return this.result === BaseResult.USER_NEEDS_MIGRATE;
  }

  get isUserAlreadyMigrated(): boolean {
    return this.result === BaseResult.USER_ALREADY_MIGRATED;
  }

  get hasEmailBeenSent(): boolean {
    return this.result === BaseResult.SEND_EMAIL_FORGOT_PASSWORD;
  }

  get isTokenExpired(): boolean {
    return this.result === BaseResult.TOKEN_EXPIRED;
  }

  get isSuccessChangePasword(): boolean {
    return this.result === BaseResult.SUCCESSFUL_PASSWORD_CHANGE;
  }

  get hasUserMigratedSuccess(): boolean {
    return this.result === BaseResult.USER_HAS_BEEN_MIGRATED;
  }

  get userAlreadyExists(): boolean {
    return this.result === BaseResult.USER_ALREADY_EXISTS;
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  close(fromButton?: boolean): void {
    fromButton ? this.closeWithOption() : this.activeModal.close();
  }

  closeWithOption(extra?: string): void {
     if (extra)
      this.activeModal.close(extra);
  }

  openModalFaq(): void {
    this.modalService.open(FaqModalComponent, { ...MODAL_CONFIG, modalDialogClass: ModalClassName.FAQ});
  }

}
