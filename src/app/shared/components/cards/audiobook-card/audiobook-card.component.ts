import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCatalogViewModel } from '@interfaces/catalog.interface';
import { ContentClassName } from '@enums/class-elements.enum';
import { ImageComponent } from '@components/image/image.component';
@Component({
  selector: 'app-audiobook-card',
  standalone: true,
  imports: [CommonModule, ImageComponent],
  templateUrl: './audiobook-card.component.html',
  styleUrls: ['./audiobook-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiobookCardComponent {
  @Input() item!: ContentCatalogViewModel;
  classImage = ContentClassName.AUDIOBOOK_IMAGE;
}
