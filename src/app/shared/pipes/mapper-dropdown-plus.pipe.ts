import { Pipe, PipeTransform } from '@angular/core';
import { DropdownPlus } from '@interfaces/dropdown-plus.interface';

@Pipe({
  name: 'mapperDropdownPlus',
  standalone: true,
})
export class MapperDropdownPlusPipe<T extends DropdownPlus> implements PipeTransform {
  transform(array: any[], args: [string, string]): DropdownPlus[] {
    return array && array.length > 0
      ? array.map((item) => ({ name: item[args[0]], value: item[args[1]] }))
      : array;
  }
}
