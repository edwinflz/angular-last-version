import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { DomManipulateService, LoadingService, ResizeService } from '@core/utils';
import { BodyClassName, BreakpointDevice, FeatureFlag, ModalClassName, TypeClassSubscriptionForm, TypePlanUser } from '@models/enums';
import { ListActivePlan, UrlSubscriptionParameters } from '@models/interfaces';
import { MODAL_CONFIG } from '@models/constants';
import { readUrlSubscriptionParameters } from '@shared/helpers';
import { ScrollIntoViewElementDirective } from '@directives/scroll-into-view-element.directive';
import { FeatureIsOnDirective } from '@directives/feature-is-on.directive';
import { SubscriptionService } from '@services/subscription.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionPlanModalComponent } from '@components/modals/subscription-plan-modal/subscription-plan-modal.component';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, ScrollIntoViewElementDirective, FeatureIsOnDirective],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionComponent implements OnInit, OnDestroy {


  openCardSubscription = false;
  openCardBasic = false;
  typeBlock = 'start';
  subscriptionOnRegister = FeatureFlag.SUBSCRIPTION_ON_REGISTER;
  planFounder: ListActivePlan | undefined;
  amount: string = '';
  domManipulateService = inject(DomManipulateService);
  resizeService = inject(ResizeService);
  loadingService = inject(LoadingService);
  subscriptionService = inject(SubscriptionService);
  modalService = inject(NgbModal);
  private _urlparameters: UrlSubscriptionParameters = readUrlSubscriptionParameters();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.domManipulateService.removeBodyClass(BodyClassName.SUBSCRIPTION_BODY);
  }

  get isMobile$(): Observable<boolean> {
    return this.resizeService.size$
      .pipe(
        map(value => value < BreakpointDevice.TABLET),
      );
  }

  enableSubscriptionBasic(): void {
    console.log('enableSubscriptionBasic');
  }

  openSubscriptionFounder(): void {
    const modalRef = this.modalService.open(SubscriptionPlanModalComponent, { ...MODAL_CONFIG, modalDialogClass: ModalClassName.SUBSCRIPTION_PLAN, size: 'xl' });
    modalRef.componentInstance.planFounder = this.planFounder;
    modalRef.componentInstance.style = TypeClassSubscriptionForm.MY_SUBSCRIPTION;
  }

  toggleCardBasic(isMobile: boolean): void {
    if (!isMobile)
      return;

    this.openCardBasic
      ? this.enableSubscriptionBasic()
      : this.openCardBasic = true;
    this.openCardSubscription = false;
  }

  toggleCardSubscription(isMobile: boolean): void {
    if (!isMobile)
      return;

    this.openCardSubscription
      ? this.openSubscriptionFounder()
      : this.openCardSubscription = true;
    this.openCardBasic = false;
  }

  private init(): void {
    this.domManipulateService.addBodyClass(BodyClassName.SUBSCRIPTION_BODY);
    this.loadingService.show();
    this.subscriptionService.listActivePlans()
    .subscribe({
      next: (plan) => {
        this.planFounder = plan.find((item) => item.id === TypePlanUser.FOUNDER);
        const price = this.planFounder?.price ?? 0;
        this.amount = (price / 100).toString();
        this.loadingService.hide();
        this.cdr.markForCheck();
      },
      error: () => this.loadingService.hide()
    });
  }
}
