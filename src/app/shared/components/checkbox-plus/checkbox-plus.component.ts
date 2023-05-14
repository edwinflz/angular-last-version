import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox-plus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-plus.component.html',
  styleUrls: ['./checkbox-plus.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: CheckboxPlusComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxPlusComponent implements ControlValueAccessor {

  @Input() classType!: string;
  @Input() set label(value: string) {
    if (value) {
      this._id = this.normalizeText(value);
      this._label = value;
    }
  };

  state!: boolean;
  touched = false;
  disabled = false;
  onChange = (state: boolean) => {};
  onTouched = () => {};

  private _id!: string;
  private _label!: string;

  constructor() {}

  get id(): string {
    return this._id;
  }

  get label(): string {
    return this._label;
  }

  writeValue(state: boolean): void {
    this.state = state;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  toggleState(value: boolean): void {
    this.state = value;
    this.onChange(this.state);
    this.markAsTouched();
  }

  /*
    Normalizar el texto y hacer que el texto sea insensible a mayúsculas, minúsculas y acentos.
  */
  private normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f\s]/g, '').toLowerCase();
  }


}
