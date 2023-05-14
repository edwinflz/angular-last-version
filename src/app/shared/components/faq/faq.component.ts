import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomManipulateService } from '@core/utils';
import { BodyClassName } from '@core/models/enums';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent {

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
