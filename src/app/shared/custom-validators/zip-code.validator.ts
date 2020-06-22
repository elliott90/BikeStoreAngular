import { ValidatorFn, AbstractControl } from '@angular/forms';

const ZIP_CODE_PATTERN = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)$/;

export class ZipCodeValidators {
  static zipCode(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && !ZIP_CODE_PATTERN.test(c.value)) {
        return { zipCode: true };
      }

      return null;
    };
  }
}
