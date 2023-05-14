import { Pipe, PipeTransform } from '@angular/core';
import { DropdownPlus } from '@interfaces/dropdown-plus.interface';

@Pipe({
  name: 'filterDropdownPlus',
  standalone: true,
})
export class FilterDropdownPlusPipe<T extends DropdownPlus> implements PipeTransform {

  transform(array: T[], args: string): T[] {
    const VALUE = this.toLowerCase(args);
    return VALUE
      ? this.filter(array, VALUE)
      : array;
  }

  filter(array: T[], args: string): T[]{
    return [...array].filter(item => this.toLowerCase(item.name).indexOf(args) !== -1);
  }

  toLowerCase(text: string): string {
    return text.toLowerCase().trim();
  }

}
