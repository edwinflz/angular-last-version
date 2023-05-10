import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCatalogViewModel } from '@interfaces/catalog.interface';
import { ImageComponent } from '@components/image/image.component';

@Component({
  selector: 'app-podcast-card',
  standalone: true,
  imports: [CommonModule, ImageComponent],
  templateUrl: './podcast-card.component.html',
  styleUrls: ['./podcast-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PodcastCardComponent {
  @Input() item!: ContentCatalogViewModel;
}
