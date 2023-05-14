import { ChangeDetectionStrategy, Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckElementIsVisibleDirective } from '@directives/check-element-is-visible.directive';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { FilterDropdownPlusPipe } from '@pipes/filter-dropdown-plus.pipe';
import { DropdownPlus } from '@interfaces/dropdown-plus.interface';
import { DropdownSearchPlusComponent } from './dropdown-search-plus/dropdown-search-plus.component';
import { DropdownHeaderPlusComponent } from './dropdown-header-plus/dropdown-header-plus.component';

@Component({
  selector: 'app-dropdown-plus',
  standalone: true,
  templateUrl: './dropdown-plus.component.html',
  styleUrls: ['./dropdown-plus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FilterDropdownPlusPipe,
    CheckElementIsVisibleDirective,
    ClickOutsideDirective,
    DropdownSearchPlusComponent,
    DropdownHeaderPlusComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropdownPlusComponent,
    },
  ],
})
export class DropdownPlusComponent<T extends DropdownPlus> implements ControlValueAccessor {

  @Input() label!: string;
  @Input() options!: T[] | any[][];
  @Input() control!: AbstractControl | null;
  @Input() showSearch!: boolean;
  @Input() hasBackground!: boolean;

  @Input('selectedTemplate') selectedTemplateRef!: TemplateRef<any>;
  @ContentChild('optionTemplate', { static: false })  optionTemplateRef!: TemplateRef<any>;

  showOptions: boolean = false;
  searchText: string = '';
  picked!: T;
  touched = false;
  onChange = (picked: T) => {};
  onTouched = () => {};

  writeValue(picked: T): void {
    this.picked = picked;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleShowOptions(): void {
    this.showOptions = !this.showOptions;
  }

  closeOptions(): void {
    this.showOptions = false;
    this.searchText = '';
    this.onChange(this.picked);
    this.markAsTouched();
  }

  selectOption(option: T): void {
    this.picked = option;
    this.closeOptions();
  }

  search(event: string): void {
    this.searchText = event;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

}
