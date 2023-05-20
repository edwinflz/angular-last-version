import { Validators } from '@angular/forms';
import { matchPassword, validDate } from '@core/utils';
import { EMAIL_REGEX } from '@core/models/constants';

export const formAuthentication = {
  email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
  password: ['', [Validators.required]],
};

export const formOnlyEmail = {
  email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
};

export const formOnlyPassword = {
  password: ['', [Validators.required]],
};

export const formChangePassword = {
  password: ['', [Validators.required, Validators.minLength(8)]],
  repeatPassword: ['', [Validators.required]],
};

export const formNewAccount = {
  email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  repeatPassword: ['', [Validators.required]],
  userName: ['', [Validators.required]],
  gender: [null],
  day: [null],
  month: [null],
  year: [null],
  birthdate: [''],
  country: [null],
  termConditions: [false, [Validators.requiredTrue]],
  imageAvatar: [null],
};

export const formChangePasswordValidators = {
  validators: matchPassword,
};

export const formNewAccountValidators = {
  validators: [matchPassword, validDate],
};
