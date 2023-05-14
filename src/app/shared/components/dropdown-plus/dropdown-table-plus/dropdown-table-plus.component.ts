import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownPlus } from '@interfaces/dropdown-plus.interface';

@Component({
  selector: 'app-dropdown-table-plus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-table-plus.component.html',
  styleUrls: ['./dropdown-table-plus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownTablePlusComponent<T extends DropdownPlus> {
  @Input() rows!: T[][];
  @Input() currentValue!: number;
  constructor() {}

  changeValue(item: T): void {}
}
