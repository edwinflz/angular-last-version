import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroHome } from '@interfaces/hero.interface';
import { HeroService } from '@services/hero.service';
import { Observable } from 'rxjs';

import { SwiperCustomDirective } from '@directives/swiper-custom.directive';
import { A11y, Mousewheel, Navigation, SwiperOptions } from 'swiper';
@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule, SwiperCustomDirective],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroSliderComponent {

  @ViewChild('heroSwiper') heroSwiper: any;

  imageDefault: string = 'assets/images/bg/bg-slider-home.png';
  heros$: Observable<HeroHome[]> = this.heroService.getListHomeHero();
  config: SwiperOptions = {
    modules: [Navigation, A11y, Mousewheel],
    autoHeight: true,
    slidesPerView: 1,
    navigation: false,
    centeredSlides: true,
  };

  constructor(private heroService: HeroService) {}

  next(): void {
    const swiper = this.heroSwiper.nativeElement.swiper;
    swiper.isEnd ? swiper.slideTo(0) : swiper.slideNext();
  }

  previous(): void {
    const swiper = this.heroSwiper.nativeElement.swiper;
    swiper.isBeginning ? swiper.slideTo(swiper.slides.length - 1) : swiper.slidePrev();
  }

  testInstaceSwiper(): void {
    this.heroSwiper.nativeElement.swiper.slideNext();
  }
}
