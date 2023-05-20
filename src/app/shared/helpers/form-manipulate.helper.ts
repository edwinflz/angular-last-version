import { AbstractControl } from "@angular/forms";
import { ControlStatus, FormManipulate } from "@interfaces/forms.interface";

export const isInValid = ({ form, control }: ControlStatus): boolean => {
  return (
    !!getFormControl({ form, control })?.touched &&
    !!getFormControl({ form, control })?.errors
  );
}

export const hasErrorControl = ({ type, control, form }: FormManipulate): boolean => {
  const FORM_CONTROL = getFormControl({ form, control });
  const ERRORS = FORM_CONTROL?.errors && FORM_CONTROL.errors[type];
  return !!FORM_CONTROL && !!ERRORS;
}

export const hasErrorForm = ({ type, control, form }: FormManipulate): boolean => {
  const FORM_CONTROL = getFormControl({ form, control });
  return form.errors?.[type] && FORM_CONTROL?.touched;
}

const getFormControl = ({ form, control }: ControlStatus): AbstractControl | null => {
  return form.get(control);
}
