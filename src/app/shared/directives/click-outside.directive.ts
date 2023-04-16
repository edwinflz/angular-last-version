import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {

  @Input('appClickOutside') canReadClick!: boolean;
  @Output() outsideClick: EventEmitter<MouseEvent> = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.canReadClick) {
      if (!this.elementRef.nativeElement.contains(event.target))
        this.outsideClick.emit(event);
    }
  }

}
