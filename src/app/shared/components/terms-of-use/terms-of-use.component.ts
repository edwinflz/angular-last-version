import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomManipulateService } from '@core/utils';
import { BodyClassName } from '@core/models/enums';

@Component({
  selector: 'app-terms-of-use',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsOfUseComponent {

  constructor(private domManipulateService: DomManipulateService,) { }

  ngOnInit(): void {
    this.domManipulateService.addBodyClass(BodyClassName.FAQ_BODY);
  }

  ngOnDestroy(): void {
    this.domManipulateService.removeBodyClass(BodyClassName.FAQ_BODY);
  }
}
