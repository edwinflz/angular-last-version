import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternationalCardFormComponent } from '@components/international-card-form/international-card-form.component';

@Component({
  selector: 'app-subscription-form-body',
  standalone: true,
  imports: [CommonModule, InternationalCardFormComponent],
  templateUrl: './subscription-form-body.component.html',
  styleUrls: ['./subscription-form-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionFormBodyComponent {
  @Input() style!: string;

  imgInternationalCard: string = '/assets/images/payment/international-cards.png';
}
