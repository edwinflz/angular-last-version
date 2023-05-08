import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogViewModelPagingRequest } from '@interfaces/catalog.interface';
import { CatalogService } from '@services/catalog.service';
import { LoadingService } from '@utils/loading.service';
import { HeroSliderComponent } from '@web/home/hero-slider/hero-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroSliderComponent],
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

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.catalogService.getListHomeCatalogs(this.pagingRequest).subscribe(result => this.loadingService.hide());
  }

}
