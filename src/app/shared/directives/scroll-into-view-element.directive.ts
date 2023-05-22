import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollIntoViewElement]',
  standalone: true
})
export class ScrollIntoViewElementDirective implements OnDestroy {

  @Input('appScrollIntoViewElement') canScroll: boolean = false;
  @Input() typeBlock: string = 'center';
  @Input() time: number = 500;

  private _time: any;

  constructor(private _elementRef: ElementRef) {}

  @HostListener('click', ['$event.target'])
  onClick() {
    if (this.canScroll) {
     this._time = setTimeout(() => {
        this._elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: this.typeBlock });
      }, this.time);
    }
  }

  ngOnDestroy(): void {
    if (this._time)
      clearTimeout(this._time);
  }

}
