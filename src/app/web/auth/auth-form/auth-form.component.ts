import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ARRAY_GENDER, MONTH_DAYS, MONTH_NAMES, YEARS } from '@constants/user-data.constants';
import { EMAIL_REGEX } from '@constants/validator-patterns.constants';
import { ErrorFormAuth, SendFormData, Country } from '@interfaces/index';
import { ButtonClassName, DropdownClassName, FeatureFlag, LoadingClassName, StepAuth } from '@enums/index';
import { ErrorFormLoginPipe, MapperDropdownPlusPipe } from '@pipes/index';
import { ApplyClassDirective } from '@directives/apply-class.directive';
import { HttpLoadingService, FormManipulateService, matchPassword, validDate } from '@utils/index';
import { FeatureFlagService } from '@services/feature-flag.service';
import { CountryService } from '@services/country.service';
import { LoadingBounceComponent, CheckboxPlusComponent, DropdownPlusComponent } from '@components/index';
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
    ApplyClassDirective,
    MapperDropdownPlusPipe
  ],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {

  @Input() stepAuth!: StepAuth;
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
  isLoading$ = this.httpLoadingService.isLoading$;
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
    private httpLoadingService: HttpLoadingService,
    private countryService: CountryService,
    private formManipulate: FormManipulateService,
    private formBuilder: UntypedFormBuilder,
    private featureFlagService: FeatureFlagService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  get isFormAuth(): boolean {
    return this.stepAuth === StepAuth.AUTH;
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

  toggleTypeInput(): void {
    this.fieldTextType = !this.fieldTextType;
  }

  formAuthentication(): UntypedFormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required]],
    });
  }

  formOnlyEmail(): UntypedFormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    });
  }

  formChangePassword(): UntypedFormGroup {
    return this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validators: matchPassword,
      }
    );
  }

  formNewAccount(): UntypedFormGroup {
    return this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        gender: [null, [Validators.required]],
        day: [null, [Validators.required]],
        month: [null, [Validators.required]],
        year: [null, [Validators.required]],
        birthdate: ['',],
        country: [null, [Validators.required]],
        termConditions: [false, [Validators.requiredTrue]],
        imageAvatar: [null],
      },
      {
        validators: [matchPassword, validDate],
      }
    );
  }

  isInValid(control: string): boolean {
    return this.formManipulate.isInValid({ form: this.form, control });
  }

  hasErrorControl(type: string, control: string): boolean {
    return this.formManipulate.hasErrorControl({ type, control, form: this.form });
  }

  hasErrorForm(type: string, control: string): boolean {
    return this.formManipulate.hasErrorForm({ type, control, form: this.form });
  }

  private getFormControl(control: string): AbstractControl | null {
    return this.form.get(control);
  }

  private buildForm(): void {
    if (this.isFormAuth)
      this.form = this.formAuthentication();
    if (this.isFormForgotPassword || this.isFormUserMigration)
      this.form = this.formOnlyEmail();
    if (this.isFormNewAccount)
      this.form = this.formNewAccount();
    if (this.isFormRestorePassword)
      this.form = this.formChangePassword();
  }

}
