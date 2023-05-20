import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagService } from '@services/feature-flag.service';

export function onAppInit(featureFlagService: FeatureFlagService): () => Promise<Object> {
  return (): Promise<object> => {
    featureFlagService.getAllFeaturesStatus().subscribe();
    return Promise.resolve({});
  };
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: onAppInit,
      multi: true,
      deps: [FeatureFlagService]
    },
  ]
})
export class AppBaseBrowserModule { }
