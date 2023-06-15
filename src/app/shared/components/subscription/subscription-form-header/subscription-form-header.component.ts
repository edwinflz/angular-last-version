import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ListActivePlan } from '@models/interfaces';
import { hasErrorControl, hasErrorForm, isInValid } from '@shared/helpers';

@Component({
  selector: 'app-subscription-form-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subscription-form-header.component.html',
  styleUrls: ['./subscription-form-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionFormHeaderComponent implements OnInit {

  @Input() style!: string;
  @Input() set planFounder(value: ListActivePlan) {
    if (value?.price) {
      this.fromAmount = (value.price / 100).toString();
    }
  };

  form!: UntypedFormGroup;
  fromAmount: string = '';
  formSubmitted: boolean = false;
  isAmountDefault: boolean = true;
  private _subscription!: Subscription;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  get amountField(): AbstractControl | null {
    return this.form.get('amount');
  }

  onRadioChange(event: Event): void {
    const selectedValue = !!(event.target as HTMLInputElement).value;
    this.clearFieldAmount();
    selectedValue ? this.setEnableAmount() : this.amountField?.disable();
  }

  setEnableAmount(): void {
    this.amountField?.enable();
    this.amountField?.setValidators([Validators.required, Validators.min(+this.fromAmount)]);
    this.amountField?.updateValueAndValidity();
  }

  clearFieldAmount(): void {
    this.amountField?.clearValidators();
    this.amountField?.setValue('');
    this.amountField?.reset();
    this.cdr.detectChanges();
  }

  submitAmount(): void {}

  isInValid(control: string): boolean {
    return isInValid({ form: this.form, control });
  }

  hasErrorControl(type: string, control: string): boolean {
    return hasErrorControl({ type, control, form: this.form });
  }

  hasErrorForm(type: string, control: string): boolean {
    return hasErrorForm({ type, control, form: this.form });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      amount: [{value: '', disabled: true}],
      gateway: ['false']
    });
  }

}
