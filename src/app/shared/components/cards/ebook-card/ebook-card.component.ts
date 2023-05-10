import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCatalogViewModel } from '@interfaces/catalog.interface';
import { ImageComponent } from '@components/image/image.component';
@Component({
  selector: 'app-ebook-card',
  standalone: true,
  imports: [CommonModule, ImageComponent],
  templateUrl: './ebook-card.component.html',
  styleUrls: ['./ebook-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EbookCardComponent {
  @Input() item!: ContentCatalogViewModel;
}
