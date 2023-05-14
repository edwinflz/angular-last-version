import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ControlStatus, FormManipulate } from '@interfaces/forms.interface';

@Injectable({
  providedIn: 'root'
})
export class FormManipulateService {

  isInValid({ form, control }: ControlStatus): boolean {
    return (
      !!this.getFormControl({ form, control })?.touched &&
      !!this.getFormControl({ form, control })?.errors
    );
  }

  hasErrorControl({ type, control, form }: FormManipulate): boolean {
    const FORM_CONTROL = this.getFormControl({ form, control });
    const ERRORS = FORM_CONTROL?.errors && FORM_CONTROL.errors[type];
    return !!FORM_CONTROL && !!ERRORS;
  }

  hasErrorForm({ type, control, form }: FormManipulate): boolean {
    const FORM_CONTROL = this.getFormControl({ form, control });
    return form.errors?.[type] && FORM_CONTROL?.touched;
  }

  private getFormControl({ form, control }: ControlStatus): AbstractControl | null {
    return form.get(control);
  }
}
