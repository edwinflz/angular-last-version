import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCatalogViewModel } from '@interfaces/catalog.interface';
import { ImageComponent } from '@components/image/image.component';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, ImageComponent],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent {
  @Input() item!: ContentCatalogViewModel;
}
