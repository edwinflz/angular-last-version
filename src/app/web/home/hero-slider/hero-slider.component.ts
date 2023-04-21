import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroHome } from '@interfaces/hero.interface';
import { HeroService } from '@services/hero.service';
import { Observable } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSliderComponent {

  customOptions: OwlOptions = {
    loop: true,
    nav: false,
    autoplay: false,
    items: 1,
    dots: false
  };
  imageDefault: string = 'assets/images/bg/bg-slider-home.png';
  heros$: Observable<HeroHome[]> = this.heroService.getListHomeHero();

  constructor(private heroService: HeroService) {}

}
