/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  @Input() products: FormArray;
  subtotal = 0;
  totalOrderDiscount = 0;
  totalOrderCost = 0;

  constructor() {}

  ngOnInit(): void {
    this.products.valueChanges.subscribe((products: FormArray) => {
      this.recalculateProductPrice(products);
    });
  }

  recalculateProductPrice(products: FormArray): void {
    // Reset the values
    this.subtotal = 0;
    this.totalOrderCost = 0;
    this.totalOrderDiscount = 0;

    // eslint-disable-next-line guard-for-in
    for (const product in products) {
      const discountPercent = products[product].discount / 100;
      const discountValue = products[product].quantity * (products[product].listPrice * discountPercent);
      const totalProductPrice = products[product].quantity * products[product].listPrice - discountValue;

      this.subtotal += products[product].listPrice * products[product].quantity;
      this.totalOrderDiscount += discountValue;
      this.totalOrderCost += totalProductPrice;
    }
  }
}
