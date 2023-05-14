import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplyBgColorDirective } from '@directives/apply-bg-color.directive';

@Component({
  selector: 'app-loading-bounce',
  standalone: true,
  imports: [CommonModule, ApplyBgColorDirective],
  templateUrl: './loading-bounce.component.html',
  styleUrls: ['./loading-bounce.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBounceComponent {
  @Input() isLoading!: boolean;
  @Input() color: string = '#4B5881';
}
