import { AbstractControl } from '@angular/forms';

export function ValidateEmailDomain(control: AbstractControl) {
    const regexp = new RegExp(
        /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(teampify)\.com$/,
      );
      if (!regexp.test(control.value)) {
        return {invalidEmail: true};
      }
      return null;
}