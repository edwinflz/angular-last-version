import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyPoliciesComponent } from '@components/privacy-policies/privacy-policies.component';

@Component({
  selector: 'app-privacy-policies-modal',
  standalone: true,
  imports: [CommonModule, PrivacyPoliciesComponent],
  templateUrl: './privacy-policies-modal.component.html',
  styleUrls: ['./privacy-policies-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPoliciesModalComponent {

  constructor(private activeModal: NgbActiveModal) { }

  dismiss(): void {
    this.activeModal.dismiss();
  }

}
