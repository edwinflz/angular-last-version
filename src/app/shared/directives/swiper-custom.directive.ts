import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Directive({
  selector: '[appSwiperCustom]',
  standalone: true,
})
export class SwiperCustomDirective implements AfterViewInit {

  private readonly swiperElement!: HTMLElement;

  @Input('config') config?: SwiperOptions;

  constructor(private el: ElementRef<HTMLElement>) {
    this.swiperElement = el.nativeElement;
  }

  ngAfterViewInit(): void {
    Object.assign(this.el.nativeElement, this.config);
    // @ts-ignore
    this.el.nativeElement.initialize();
  }

}
