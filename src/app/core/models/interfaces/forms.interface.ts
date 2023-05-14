import { UntypedFormGroup } from '@angular/forms';

export interface FormManipulate {
  form: UntypedFormGroup,
  control: string,
  type: string,
}

export type ControlStatus = Omit<FormManipulate, 'type'>;
