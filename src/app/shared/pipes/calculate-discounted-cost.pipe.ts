import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateDiscountedCost',
})
export class CalculateDiscountedCostPipe implements PipeTransform {
  transform(value: number, discount: number): number {
    return value - value * discount;
  }
}
