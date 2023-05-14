import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbAuth } from '@interfaces/authentication.interface';
import { StepAuth } from '@enums/authentication.enum';

@Component({
  selector: 'app-auth-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-breadcrumb.component.html',
  styleUrls: ['./auth-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthBreadcrumbComponent {
  @Input() breadCrumb!: BreadCrumbAuth[];
  @Output() changeStep: EventEmitter<StepAuth> = new EventEmitter();

  constructor() { }

  onChangeStep(canClick: boolean, type: StepAuth): void {
    if (canClick) this.changeStep.emit(type);
  }
}
