import { ValidatorFn, AbstractControl } from '@angular/forms';

export class NumberRangeValidators {
  static YearRange(minYear: number, maxYear: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value !== null && (isNaN(c.value) || c.value > maxYear || c.value < minYear)) {
        return { range: true };
      }

      return null;
    };
  }
}
