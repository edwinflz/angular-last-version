import { Pipe, PipeTransform } from '@angular/core';
import { BaseResult } from '@enums/authentication.enum';

const ERROR_FORM_LOGIN: any = {
  [BaseResult.EMAIL_REQUIRED]: 'Correo Electronico Requerido.',
  [BaseResult.PASSWORD_REQUIRED]: 'Contraseña Requerido.',
  [BaseResult.USER_NEEDS_MIGRATE]: 'Usuario necesita ser migrado.',
  [BaseResult.USER_NOT_FOUND]: 'Tu correo electrónico o contraseña es incorrecto, inténtalo nuevamente.',
  [BaseResult.PASSWORD_INCORRECT]: 'Tu correo electrónico o contraseña es incorrecto, inténtalo nuevamente.',
}

@Pipe({
  name: 'errorFormLogin',
  standalone: true,
})
export class ErrorFormLoginPipe implements PipeTransform {

  transform(errorEnum: number, ...args: unknown[]): string {
    return ERROR_FORM_LOGIN[errorEnum] || '';
  }

}
