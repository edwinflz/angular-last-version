import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper, { A11y, Mousewheel, Navigation, SwiperOptions } from 'swiper';
import { CatalogViewModel } from '@interfaces/catalog.interface';
import { ContentCard } from '@enums/content.enum';
import { SwiperCustomDirective } from '@directives/swiper-custom.directive';
import { PodcastCardComponent } from '@components/cards/podcast-card/podcast-card.component';
import { VideoCardComponent } from '../cards/video-card/video-card.component';
import { ArticleCardComponent } from '../cards/article-card/article-card.component';
import { AudiobookCardComponent } from '../cards/audiobook-card/audiobook-card.component';
import { EbookCardComponent } from '../cards/ebook-card/ebook-card.component';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CommonModule,
    SwiperCustomDirective,
    PodcastCardComponent,
    VideoCardComponent,
    ArticleCardComponent,
    AudiobookCardComponent,
    EbookCardComponent
  ],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent {

  @Input() catalog!: CatalogViewModel;

  @ViewChild('slider') slider!: ElementRef;
  config: SwiperOptions = {
    modules: [Navigation, A11y, Mousewheel],
    slidesPerView: 'auto',
    spaceBetween: 12,
    navigation: false,
    loop: true,
  };

  get isPodcast(): boolean {
    return this.catalog.defaultContentType === ContentCard.PODCAST;
  }

  get isProgramOrVideo(): boolean {
    return this.catalog.defaultContentType === ContentCard.VIDEO || this.catalog.defaultContentType === ContentCard.PROGRAM;
  }

  get isAudiobook(): boolean {
    return this.catalog.defaultContentType === ContentCard.AUDIOBOOK;
  }

  get isEbook(): boolean {
    return this.catalog.defaultContentType === ContentCard.EBOOK;
  }

  get isArticle(): boolean {
    return this.catalog.defaultContentType === ContentCard.ARTICLE;
  }

}
