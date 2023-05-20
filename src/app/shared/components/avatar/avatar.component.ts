import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { base64ToBlob } from '@shared/helpers';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule, ImageCropperModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() index: number = 0;
  @Output() setImage = new EventEmitter<Blob>();
  @ViewChild('imageInput') imageInputElement!: ElementRef;

  showCropper = false;
  image = '';
  tempImage: string | null | undefined = '';
  imageChangedEvent!: Event;

  readFile(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target?.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.onImageLoad(e, event);
      };
      reader.readAsDataURL(file);
    }
  }

  onImageLoad(event: ProgressEvent<FileReader>, originalEvent: Event): void {
    const image = new Image();
    image.src = event.target?.result as string;
    image.onload = (rs: Event) => {
      this.onImageLoaded(rs.currentTarget as HTMLImageElement, originalEvent);
    };
  }

  onImageLoaded(image: HTMLImageElement, event: Event): void {
    const imgHeight = image.height;
    const imgWidth = image.width;
    const validate = this.validateImage(imgHeight, imgWidth);
    if (validate) {
      this.showCropper = true;
      this.imageChangedEvent = event;
    } else {
      this.openModal();
    }
  }

  openModal(): void {
    console.log('openModal');
  }

  validateImage(imgHeight: number, imgWidth: number): boolean {
    return imgHeight >= 300 && imgWidth >= 300;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.tempImage = event.base64;
  }

  cancelCrop(): void {
    this.showCropper = false;
    this.tempImage = '';
    this.imageInputElement.nativeElement.value = ''
  }

  saveImage(): void {
    this.showCropper = false;
    this.image = this.tempImage as string;
    const imgBlob: Blob = base64ToBlob(this.image);
    this.setImage.emit(imgBlob);
    // this.image = this.tempImage;
  }
}
