import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { DomManipulateService, ResizeService } from '@core/utils';
import { BodyClassName, BreakpointDevice } from '@models/enums';
import { UrlSubscriptionParameters } from '@models/interfaces';
import { readUrlSubscriptionParameters } from '@shared/helpers';
import { ScrollIntoViewElementDirective } from '@directives/scroll-into-view-element.directive';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, ScrollIntoViewElementDirective],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionComponent implements OnInit, OnDestroy {

  domManipulateService = inject(DomManipulateService);
  resizeService = inject(ResizeService);
  openCardSubscription = false;
  openCardBasic = false;
  typeBlock = 'start';
  private _urlparameters: UrlSubscriptionParameters = readUrlSubscriptionParameters();

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

  openSubscriptionFounder(): void {}

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
  }
}
