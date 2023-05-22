import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseModal } from '@models/interfaces';

@Component({
  selector: 'app-response-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response-modal.component.html',
  styleUrls: ['./response-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseModalComponent {

  @Input() response!: ResponseModal;

  constructor(private activeModal: NgbActiveModal) {}

  dismiss(): void {
    this.activeModal.dismiss();
  }

  close(extra: string = ''): void {
    this.activeModal.close(extra) ;
  }
}
