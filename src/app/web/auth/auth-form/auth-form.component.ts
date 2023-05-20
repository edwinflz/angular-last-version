import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ARRAY_GENDER, MONTH_DAYS, MONTH_NAMES, YEARS } from '@constants/user-data.constants';
import { ErrorFormAuth, SendFormData, Country } from '@interfaces/index';
import { ButtonClassName, DropdownClassName, FeatureFlag, LoadingClassName, StepAuth, TypeFieldsForm } from '@enums/index';
import { ErrorFormLoginPipe, MapperDropdownPlusPipe } from '@pipes/index';
import { ApplyClassDirective } from '@directives/apply-class.directive';
import { hasErrorControl, hasErrorForm, isInValid } from '@shared/helpers';
import { HttpLoadingService } from '@utils/index';
import { FeatureFlagService } from '@services/feature-flag.service';
import { CountryService } from '@services/country.service';
import { LoadingBounceComponent, CheckboxPlusComponent, DropdownPlusComponent, AvatarComponent } from '@components/index';
import { formAuthentication, formChangePassword, formNewAccount, formOnlyEmail, formOnlyPassword,
  formChangePasswordValidators, formNewAccountValidators } from './built-form-auth.helper';
const TEXT = 'text';
const PASSWORD = 'password';
@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorFormLoginPipe,
    LoadingBounceComponent, DropdownPlusComponent, CheckboxPlusComponent,
    AvatarComponent,
    ApplyClassDirective,
    MapperDropdownPlusPipe
  ],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {

  @Input() stepAuth!: StepAuth;
  @Input() isWebview!: boolean;
  @Input() titleButton!: string;
  @Input() set errorForm(value: ErrorFormAuth | null) {
    if (value && value.input) {
      this.getFormControl(value.input)?.setErrors({invalid: true});
      if (value.anotherInput)
        this.getFormControl(value.anotherInput)?.setErrors({invalid: true});
      if (value.errorEnum) this.errorEnum = value.errorEnum;
    }
  };
  @Output() sendData: EventEmitter<SendFormData> = new EventEmitter();
  @Output() openPolicyPrivacy: EventEmitter<boolean> = new EventEmitter();
  isLoading$ = inject(HttpLoadingService).isLoading$;
  countries$: Observable<Country[]> = this.countryService.getCountriesLite();
  form!: UntypedFormGroup;
  errorEnum!: number;
  fieldTextType: boolean = false;
  buttonClassName = ButtonClassName.LOGIN_BUTTON;
  loadingClassName = LoadingClassName.LOGIN_LOADING;
  dropdownClassName = DropdownClassName.BIBLE_DROPDOWN;
  arrayGender = ARRAY_GENDER;
  monthDays = MONTH_DAYS;
  monthList = MONTH_NAMES;
  yearList = YEARS;

  constructor(
    private countryService: CountryService,
    private formBuilder: UntypedFormBuilder,
    private featureFlagService: FeatureFlagService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  get isFormAuth(): boolean {
    return this.stepAuth === StepAuth.AUTH;
  }

  get isFormCheckPassword(): boolean {
    return this.stepAuth === StepAuth.CHECK_PASSWORD;
  }

  get isFormRestorePassword(): boolean {
    return this.stepAuth === StepAuth.RESET_PASSWORD ||
    this.stepAuth === StepAuth.CHANGE_PASSWORD;
  }

  get isFormForgotPassword(): boolean {
    return this.stepAuth === StepAuth.FORGOT_PASSWORD;
  }

  get isFormUserMigration(): boolean {
    return this.stepAuth === StepAuth.USER_MIGRATION;
  }

  get isFormNewAccount(): boolean {
    return this.stepAuth === StepAuth.NEW_ACCOUNT;
  }

  get fieldPassword(): string {
    return this.fieldTextType ? TEXT : PASSWORD;
  }

  get loadingButton$(): Observable<boolean> {
    return this.isLoading$.pipe(map(isLoading => this.form.invalid || isLoading));
  }

  get isAuthRegisterRequireBirthdateEnable(): boolean {
    return this.featureFlagService.checkFeatureOn(FeatureFlag.BIRTHDATE_ENABLE);
  }

  get isAuthRegisterRequireGenderEnable(): boolean {
    return this.featureFlagService.checkFeatureOn(FeatureFlag.GENDER_ENABLE);
  }

  get isAuthRegisterRequireCountryEnable(): boolean {
    return this.featureFlagService.checkFeatureOn(FeatureFlag.COUNTRY_ENABLE);
  }

  sendFormData(): void {
    if (this.form.valid)
      this.sendData.emit({ step: this.stepAuth, data: this.form.value });
  }

  setImage(image: Blob) {
    this.getFormControl(TypeFieldsForm.IMAGE_AVATAR)?.setValue(image);
  }

  toggleTypeInput(): void {
    this.fieldTextType = !this.fieldTextType;
  }

  formAuthentication(): UntypedFormGroup {
    return this.formBuilder.group(formAuthentication);
  }

  formOnlyEmail(): UntypedFormGroup {
    return this.formBuilder.group(formOnlyEmail);
  }

  formOnlyPassword(): UntypedFormGroup {
    return this.formBuilder.group(formOnlyPassword);
  }

  formChangePassword(): UntypedFormGroup {
    return this.formBuilder.group(formChangePassword, formChangePasswordValidators);
  }

  formNewAccount(): UntypedFormGroup {
    return this.formBuilder.group(formNewAccount, formNewAccountValidators);
  }

  isInValid(control: string): boolean {
    return isInValid({ form: this.form, control });
  }

  hasErrorControl(type: string, control: string): boolean {
    return hasErrorControl({ type, control, form: this.form });
  }

  hasErrorForm(type: string, control: string): boolean {
    return hasErrorForm({ type, control, form: this.form });
  }

  private getFormControl(control: string): AbstractControl | null {
    return this.form.get(control);
  }

  private buildForm(): void {
    if (this.isFormAuth)
      this.form = this.formOnlyEmail();
    if (this.isFormCheckPassword)
      this.form = this.formOnlyPassword();
    if (this.isFormForgotPassword || this.isFormUserMigration)
      this.form = this.formOnlyEmail();
    if (this.isFormNewAccount)
      this.form = this.formNewAccount();
    if (this.isFormRestorePassword)
      this.form = this.formChangePassword();
    this.setValidationNewAccount();
  }

  private setValidationNewAccount(): void {
    if (this.isAuthRegisterRequireBirthdateEnable) {
      this.getFormControl(TypeFieldsForm.DAY)?.setValidators([Validators.required]);
      this.getFormControl(TypeFieldsForm.MONTH)?.setValidators([Validators.required]);
      this.getFormControl(TypeFieldsForm.YEAR)?.setValidators([Validators.required]);
    }
    if (this.isAuthRegisterRequireGenderEnable)
      this.getFormControl(TypeFieldsForm.GENDER)?.setValidators([Validators.required]);
    if (this.isAuthRegisterRequireCountryEnable)
      this.getFormControl(TypeFieldsForm.COUNTRY)?.setValidators([Validators.required]);
  }

}
