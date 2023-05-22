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
    path: AppRoutes.AUTH,
    loadComponent: () =>
      import('@web/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: AppRoutes.SUBSCRIPTION,
    loadComponent: () =>
      import('@web/subscription/subscription.component').then((m) => m.SubscriptionComponent)
  },
  {
    path: AppRoutes.TERMS_OF_USE,
    loadComponent: () =>
      import('@components/terms-of-use/terms-of-use.component').then((m) => m.TermsOfUseComponent)
  },
  {
    path: AppRoutes.FAQ,
    loadComponent: () =>
      import('@components/faq/faq.component').then((m) => m.FaqComponent)
  },
  {
    path: AppRoutes.PRIVACY_POLICIES,
    loadComponent: () =>
      import('@components/privacy-policies/privacy-policies.component').then((m) => m.PrivacyPoliciesComponent)
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
