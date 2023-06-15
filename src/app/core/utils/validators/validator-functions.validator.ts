import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isExists } from 'date-fns'

export const matchPassword: ValidatorFn = (control: AbstractControl):
  ValidationErrors | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    password && repeatPassword && password.value !== repeatPassword.value
      && repeatPassword.setErrors({ mustMatch: true })
    return null;
};

export const validDate: ValidatorFn = (control: AbstractControl):
  ValidationErrors | null => {
    const day = control.get('day');
    const month = control.get('month');
    const year = control.get('year');
    if (day?.value && month?.value && year?.value) {
      const { value: valueDay } = day.value;
      const { value: valueMonth } = month.value;
      const { value: valueYear } = year.value;
      const isValidDate = isExists(valueYear, valueMonth, valueDay);
      if (!isValidDate) {
        day.setErrors({ invalidDate: true });
      } else {
        day.setErrors(null);
      }
    }
    return null;
};

export const expiredCardDateValidator: ValidatorFn = (control: AbstractControl):
  ValidationErrors | null => {
    const value = control.value;

    return null;
};

// export function expiredCardDateValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value = control.value;
//     if (!value) return null;
//     const dates = value.split('/');
//     if (dates.length !== 2) return null;

//     const expiryMonth = dates[0].replace(/\s/g, '');
//     const expiryYear = dates[1].replace(/\s/g, '');
//     if (
//       expiryYear &&
//       expiryMonth.length === 2 &&
//       (+expiryMonth >= 1 || +expiryMonth <= 12) &&
//       (expiryYear.length === 2 || expiryYear.length === 4) &&
//       (+expiryYear >= 1 || (+expiryYear <= 99 || +expiryYear <= 9999)) &&
//       Stripe.card.validateExpiry(expiryMonth, expiryYear)
//     ) {
//       return null;
//     } else {
//       return { expiredCard: true };
//     }
//   };
// }
