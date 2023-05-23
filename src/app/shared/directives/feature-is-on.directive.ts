import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FeatureFlagService } from '@services/feature-flag.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFeatureIsOn]',
  standalone: true,
})
export class FeatureIsOnDirective implements OnInit, OnDestroy {

  @Input() appFeatureIsOn!: string;
  private _subscription: Subscription | undefined;

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private featureFlagService: FeatureFlagService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._subscription = this.featureFlagService.featureStatus$.subscribe(() => {
      this.featureFlagService.checkFeatureOn(this.appFeatureIsOn)
        ? this._viewContainer.createEmbeddedView(this._templateRef)
        : this._viewContainer.clear();
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this._subscription)
      this._subscription.unsubscribe();
  }

}
