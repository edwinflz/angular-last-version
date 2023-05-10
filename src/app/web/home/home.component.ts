import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogViewModelPaging, CatalogViewModelPagingRequest } from '@interfaces/catalog.interface';
import { CatalogService } from '@services/catalog.service';
import { LoadingService } from '@utils/loading.service';
import { HeroSliderComponent } from '@web/home/hero-slider/hero-slider.component';
import { SliderComponent } from '@components/slider/slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroSliderComponent, SliderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  pagingRequest: CatalogViewModelPagingRequest = <CatalogViewModelPagingRequest>{
    page: 0,
    pagingDisable: false,
    topDisable: false,
    top: 4,
    pagesLoaded: 0,
    sectionName: 'home',
    contentType: 'all'
  };
  loadingService = inject(LoadingService);
  cdr = inject(ChangeDetectorRef);
  homeCatalogs!: CatalogViewModelPaging;

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.loadingService.show();
    this.catalogService.getListHomeCatalogs(this.pagingRequest).subscribe(result => {
      this.loadingService.hide();
      this.homeCatalogs = result;
      this.cdr.markForCheck();
    });
  }

}
