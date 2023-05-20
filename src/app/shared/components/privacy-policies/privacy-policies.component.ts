import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BodyClassName } from '@enums/class-elements.enum';
import { DomManipulateService } from '@utils/dom-manipulate.service';

@Component({
  selector: 'app-privacy-policies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policies.component.html',
  styleUrls: ['./privacy-policies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPoliciesComponent implements OnInit, OnDestroy {

  @Input() hasBackground: boolean = true;

  constructor(private domManipulateService: DomManipulateService,) { }

  ngOnInit(): void {
    if (this.hasBackground)
      this.domManipulateService.addBodyClass(BodyClassName.FAQ_BODY);
  }

  ngOnDestroy(): void {
    this.domManipulateService.removeBodyClass(BodyClassName.FAQ_BODY);
  }
}
