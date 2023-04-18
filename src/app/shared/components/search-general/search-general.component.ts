import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SEARCH_FILTER } from '@constants/search-advanced.constant';
import { TypeFitlter } from '@interfaces/search-advanced.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-general',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-general.component.html',
  styleUrls: ['./search-general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchGeneralComponent {

  isOpenOption = false;
  listFilters = SEARCH_FILTER;
  typeSelected: TypeFitlter = SEARCH_FILTER[0];
  searchText = '';

  toggleOpenOption(): void {
    this.isOpenOption = !this.isOpenOption;
  }

  changeFilter(item: TypeFitlter): void {
    this.typeSelected = item;
    this.toggleOpenOption();
  }

  search(): void {

  }
}
