import { Routes } from '@angular/router';
import { AppRoutes } from '@enums/routes.enum';
import { WebComponent } from '@web/web.component';

export const WEB_ROUTES: Routes = [
  {
    path: '',
    component: WebComponent,
    children: [
      {
        path: AppRoutes.HOME,
        loadComponent: () =>
          import('@web/home/home.component').then((m) => m.HomeComponent),
      },
    ]
  }
];
