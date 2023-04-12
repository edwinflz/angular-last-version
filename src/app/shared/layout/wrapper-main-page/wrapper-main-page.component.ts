import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'app-wrapper-main-page',
  template: `
  <app-header></app-header>
    <ng-content></ng-content>
  <app-footer></app-footer>`,
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapperMainPageComponent {}
