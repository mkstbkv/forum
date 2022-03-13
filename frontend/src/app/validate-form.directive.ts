import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';

export function identicalValidator(fields: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstInput = control.get(fields[0]);
    const secondInput = control.get(fields[1]);

    if (firstInput && firstInput.value) {
      return null;
    } else if (secondInput && secondInput.value) {
      return null;
    }

    return {descriptionOrImage: true};
  };
}

@Directive({
  selector: '[appValidateForm]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateFormDirective,
    multi: true
  }]
})
export class ValidateFormDirective implements Validator {
  @Input('appValidateForm') identicalFields: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    return identicalValidator(this.identicalFields)(control);
  }
}
