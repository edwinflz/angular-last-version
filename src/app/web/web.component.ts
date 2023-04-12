import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WrapperMainPageComponent } from '@layouts/wrapper-main-page/wrapper-main-page.component';

@Component({
  selector: 'app-web',
  template: `
  <app-wrapper-main-page>
    <router-outlet></router-outlet>
  </app-wrapper-main-page>
  `,
  standalone: true,
  imports: [WrapperMainPageComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebComponent {}
