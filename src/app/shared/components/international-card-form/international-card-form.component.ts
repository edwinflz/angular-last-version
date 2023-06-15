import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SaveCard } from '@interfaces/payment.interface';
import { EXPIRED_CARD_REGEX } from '@models/constants';
import { expiredCardDateValidator } from '@core/utils';
import { isInValid } from '@shared/helpers';

@Component({
  selector: 'app-international-card-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './international-card-form.component.html',
  styleUrls: ['./international-card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InternationalCardFormComponent implements OnInit {

  @Input() style!: string;
  @Output() onSubmitCard: EventEmitter<SaveCard> = new EventEmitter();

  form!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,) {}

  ngOnInit(): void {
   this.init();
  }

  submitCard(): void {

  }

  isInValid(control: string): boolean {
    return isInValid({ form: this.form, control });
  }

  private init(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      cardName: ['', [Validators.required]],
      payerlastName: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      district: [null],
      payerEmail: ['', { updateOn: 'blur' }],
      postalCode: [''],
      cardNumber: ['', [Validators.required, Validators.maxLength(19)]], // 19 for the 3 spaces
      expiredDate: ['', [Validators.required, Validators.pattern(EXPIRED_CARD_REGEX), expiredCardDateValidator]],
      maskedCVV: ['', [Validators.required, Validators.maxLength(4)]],
      isDefaultCard: [false],
      payerDocument: [''],
    });
  }
}
