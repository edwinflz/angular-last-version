import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionFormHeaderComponent } from '@components/subscription/subscription-form-header/subscription-form-header.component';
import { SubscriptionFormBodyComponent } from '@components/subscription/subscription-form-body/subscription-form-body.component';
import { ListActivePlan } from '@models/interfaces';

@Component({
  selector: 'app-subscription-plan-modal',
  standalone: true,
  imports: [
    CommonModule,
    SubscriptionFormBodyComponent,
    SubscriptionFormHeaderComponent,
  ],
  template: `
    <div class="modal-header">
      <div (click)="dismiss()">&times;</div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
          <app-subscription-form-header
            [planFounder]="planFounder"
            [style]="style">
          </app-subscription-form-header>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12 mt-4">
          <app-subscription-form-body [style]="style"></app-subscription-form-body>
        </div>
      </div>
    </div>`,
  styles: [
    `
      .container {
        padding: 0 38px;
      }
    `,
    `
      @media (max-width: 767px) {
        .container {
          padding: 0 16px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionPlanModalComponent {
  planFounder!: ListActivePlan;
  style!: string;

  constructor(private activeModal: NgbActiveModal) {}

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
