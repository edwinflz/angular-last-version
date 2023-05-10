import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule],
  styles: [
    `
      .content-img {
        width: 100%;
        object-fit: cover;
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
        &.audiobook-img {
          max-height: 150px;
          height: 100%;
        }
        &.loading {
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
      }
    `,
  ],
  template: `
    <img
      class="content-img {{ classImage }}"
      [src]="urlImage"
      [alt]="nameImage"
      [ngClass]="{ loading: !imageLoaded }"
      (load)="imageLoaded = true"
      priority
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  @Input() urlImage!: string;
  @Input() nameImage!: string;
  @Input() classImage!: string;

  imageLoaded = false;
}
