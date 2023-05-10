import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCatalogViewModel } from '@interfaces/catalog.interface';
import { ImageComponent } from '@components/image/image.component';
@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule, ImageComponent],
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoCardComponent {
  @Input() item!: ContentCatalogViewModel;
}
