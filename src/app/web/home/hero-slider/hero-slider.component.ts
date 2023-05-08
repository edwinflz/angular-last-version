import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroHome } from '@interfaces/hero.interface';
import { HeroService } from '@services/hero.service';
import { Observable } from 'rxjs';

import { SwiperCustomDirective } from '@directives/swiper-custom.directive';
import Swiper, { A11y, Mousewheel, Navigation, SwiperOptions } from 'swiper';
@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule, SwiperCustomDirective],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroSliderComponent implements AfterViewInit {

  @ViewChild('heroSwiper') heroSwiper!: ElementRef;

  imageDefault: string = 'assets/images/bg/bg-slider-home.png';
  heros$: Observable<HeroHome[]> = this.heroService.getListHomeHero();
  config: SwiperOptions = {
    modules: [Navigation, A11y, Mousewheel],
    autoHeight: true,
    slidesPerView: 1,
    navigation: false,
    centeredSlides: true,
  };

  private _swiper!: Swiper;

  constructor(private heroService: HeroService) {}

  ngAfterViewInit(): void {
    this._swiper = this.heroSwiper.nativeElement.swiper;
  }

  next(): void {
    this._swiper.isEnd ? this._swiper.slideTo(0) : this._swiper.slideNext();
  }

  previous(): void {
    this._swiper.isBeginning ? this._swiper.slideTo(this._swiper.slides.length - 1) : this._swiper.slidePrev();
  }

}
