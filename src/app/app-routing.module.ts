import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '@enums/routes.enum';

const routes: Routes = [
  {
    path: AppRoutes.HOME,
    loadChildren: () =>
      import('@web/web-routes').then((m) => m.WEB_ROUTES),
  },
  {
    path: '**',
    redirectTo: AppRoutes.HOME
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
