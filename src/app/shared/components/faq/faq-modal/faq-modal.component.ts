import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FaqComponent } from '@components/faq/faq.component';

@Component({
  selector: 'app-faq-modal',
  standalone: true,
  imports: [CommonModule, FaqComponent],
  templateUrl: './faq-modal.component.html',
  styleUrls: ['./faq-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqModalComponent {

  constructor(private activeModal: NgbActiveModal) { }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
