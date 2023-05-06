import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSliderComponent } from '@web/home/hero-slider/hero-slider.component';
import { CatalogService } from '@services/catalog.service';
import { CatalogViewModelPagingRequest } from '@interfaces/catalog.interface';

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

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalogService.getListHomeCatalogs(this.pagingRequest).subscribe(result => console.log(result));
  }

}
