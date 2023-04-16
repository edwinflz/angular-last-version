import { ClickOutsideDirective } from '../click-outside.directive';
import { ElementRef } from '@angular/core';

describe('ClickOutsideDirective', () => {
  let directive: ClickOutsideDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('div'));
    directive = new ClickOutsideDirective(elementRef);
  });

  it('should create an instance: ClickOutsideDirective', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit an event when clicking outside the element', () => {
    const event = new MouseEvent('mousedown');
    directive.canReadClick = true;
    spyOn(directive.outsideClick, 'emit');
    directive.onClick(event);
    expect(directive.outsideClick.emit).toHaveBeenCalled();
  });

  it('should not emit an event when clicking inside the element', () => {
    const event = new MouseEvent('mousedown');
    directive.canReadClick = true;
    spyOn(elementRef.nativeElement, 'contains').and.returnValue(true);
    spyOn(directive.outsideClick, 'emit');
    directive.onClick(event);
    expect(directive.outsideClick.emit).not.toHaveBeenCalled();
  });

  it('should not emit an event when canReadClick is false', () => {
    const event = new MouseEvent('mousedown');
    directive.canReadClick = false;
    spyOn(elementRef.nativeElement, 'contains').and.returnValue(false);
    spyOn(directive.outsideClick, 'emit');
    directive.onClick(event);
    expect(directive.outsideClick.emit).not.toHaveBeenCalled();
  });
});
