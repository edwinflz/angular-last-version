import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-loading></app-loading>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
