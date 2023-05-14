import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutes, BaseResult, EmailRoutes, ModalClassName, StepAuth } from '@core/models/enums';
import { MODAL_CONFIG } from '@constants/modal-config.constants';
import { FaqModalComponent } from '@components/faq/faq-modal/faq-modal.component';

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
  @Input() isMobile!: boolean;

  faqRoute: string = AppRoutes.FAQ;
  emailSupport: string = EmailRoutes.SUPPORT;
  newAccount: StepAuth = StepAuth.NEW_ACCOUNT;
  signIn: StepAuth = StepAuth.AUTH;
  fromMainButton: boolean = true;

  constructor(private activeModal: NgbActiveModal,private modalService: NgbModal) { }

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

  dismiss(): void {
    this.activeModal.dismiss();
  }

  close(fromButton?: boolean): void {
    fromButton ? this.closeWithOption() : this.activeModal.close();
  }

  closeWithOption(extra?: string): void {
     if (this.isUserNeedsMigrateFromAnyStep)
      this.activeModal.close(BaseResult.SEND_EMAIL_FOR_MIGRATION);
     if (extra)
      this.activeModal.close(extra);
  }

  openModalFaq(): void {
    this.modalService.open(FaqModalComponent, { ...MODAL_CONFIG, modalDialogClass: ModalClassName.FAQ});
  }

}
