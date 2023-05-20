import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DropdownPlus } from '@interfaces/dropdown-plus.interface';

@Component({
  selector: 'app-dropdown-header-plus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-header-plus.component.html',
  styleUrls: ['./dropdown-header-plus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownHeaderPlusComponent<T extends DropdownPlus> {

  @Input() label!: string;
  @Input() hasBrackground!: boolean;
  @Input() picked!: T | null;

}
