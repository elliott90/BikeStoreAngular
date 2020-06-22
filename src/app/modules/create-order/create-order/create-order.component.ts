import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ICustomer } from 'src/app/shared/interfaces/ICustomer';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/core/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { GrowlerService, GrowlerMessageType } from 'src/app/core/growler/growler.service';
import { ZipCodeValidators } from 'src/app/shared/custom-validators/zip-code.validator';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  providers: [CurrencyPipe]
})
export class CreateOrderComponent implements OnInit {
  hasCustomerOnLoad = false;
  orderForm: FormGroup;
  totalOrderCost = 0;
  totalOrderDiscount = 0;

  get productsForm(): FormArray {
    return <FormArray>this.orderForm.get('products');
  }

  get customerForm(): FormGroup {
    return <FormGroup>this.orderForm.get('customer');
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private productService: ProductService,
    private growlerService: GrowlerService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    // If route contains customer id, search and update form
    this.route.paramMap.subscribe((param) => {
      const customerId = +param.get('customerId');
      if (customerId) {
        this.hasCustomerOnLoad = true;
        this.getCustomerAndPatchCustomer(+param.get('customerId'));
      }
    });

    this.orderForm = this.fb.group({
      isExistingCustomer: [false],
      existingCustomerSearch: '',
      productSearch: '',
      customer: this.fb.group({
        customerId: [0],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['', ZipCodeValidators.zipCode()],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        sendQuote: true,
        notification: 'email',
      }),
      products: this.fb.array([], Validators.required),
    });

    this.orderForm.get('customer.notification').valueChanges.subscribe((value) => this.setNotification(value));

    this.productsForm.valueChanges.subscribe((value: FormControl[]) => {
      this.recalculateProductPrice(value);
    });
  }

  getCustomerAndPatchCustomer(customerId: number): void {
    this.customerService.getCustomer(customerId).subscribe((customer: ICustomer) => {
      this.patchCustomer(customer);
      this.customerForm.markAllAsTouched();
    });
  }

  // https://stackblitz.com/edit/angular-reactive-form-sobsoft?file=app%2Fapp.component.ts
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  recalculateProductPrice(products: any): void {
    const control = <FormArray>this.orderForm.controls.products;

    this.totalOrderCost = 0;
    this.totalOrderDiscount = 0;

    // eslint-disable-next-line guard-for-in
    for (const product in products) {
      const discountPercent = products[product].discount / 100;
      const discountValue = products[product].quantity * (products[product].listPrice * discountPercent);
      const totalProductPrice = products[product].quantity * products[product].listPrice - discountValue;

      control
        .at(+product)
        .get('price')
        .setValue(totalProductPrice, { onlySelf: true, emitEvent: false });

      this.totalOrderDiscount += discountValue;
      this.totalOrderCost += totalProductPrice;
    }
  }

  save(): void {
    console.log(this.orderForm);
    this.growlerService.growl('Saved Order', GrowlerMessageType.Success);
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.orderForm.get('customer.phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  // https://weblog.west-wind.com/posts/2019/Apr/08/Using-the-ngBootStrap-TypeAhead-Control-with-Dynamic-Data
  customerSearch = (text$: Observable<string>): Observable<ICustomer[]> =>
    text$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      // tap(() => this.searching = true),
      switchMap((term) => this.customerService.searchCustomers(term))
      // tap(() => this.searching = false)
    );

  customerFormatter = (customer: ICustomer): string => (customer ? `${customer.firstName} ${customer.lastName}` : '');

  customerInputFormatter = (customer: ICustomer | null): string =>
    customer ? `${customer.firstName} ${customer.lastName}` : '';

  selectCustomer(event: NgbTypeaheadSelectItemEvent): void {
    const customer = event.item as ICustomer;
    this.patchCustomer(customer);
  }

  patchCustomer(customer: ICustomer): void {
    this.orderForm.get('customer').patchValue({
      existingCustomerSearch: '',
      customerId: { value: customer.customerId, disabled: true },
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      street: customer.street,
      city: customer.city,
      state: customer.state,
      zipCode: customer.zipCode,
    });
  }

  productSearch = ($text$: Observable<string>): Observable<IProduct[]> =>
    $text$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      // tap(() => this.searching = true),
      switchMap((term) => this.productService.getProductsBySearchString(term))
      // tap(() => this.searching = false)
    );

  productFormatter = (product: IProduct): string => `${product.productName} (${this.currencyPipe.transform(product.listPrice, '£')})`;

  productInputFormatter = (product: IProduct): string => (product ? `${product.productName}` : '');

  selectProduct(event: NgbTypeaheadSelectItemEvent): void {
    const product = event.item as IProduct;

    this.productsForm.push(
      this.fb.group({
        productName: [{ value: product.productName, disabled: true }],
        listPrice: [product.listPrice],
        discount: [0],
        price: [{ value: product.listPrice, disabled: true }],
        quantity: [1, [Validators.min(1), Validators.max(5)]],
      })
    );

    setTimeout(() => {
      this.orderForm.patchValue({
        productSearch: '',
      });
    }, 200);
  }

  removeProduct(index: number): void {
    this.productsForm.removeAt(index);
  }
}
