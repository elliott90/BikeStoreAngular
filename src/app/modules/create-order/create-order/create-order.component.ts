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
import { ProductFilter } from 'src/app/core/filter-models/product-filter';
import { IPagedResponse } from 'src/app/shared/interfaces/IPagedResponse';
import { IPagedResults } from 'src/app/shared/interfaces/IPagedResults';
import { IOrderCreation } from 'src/app/shared/interfaces/IOrderCreation';
import { OrderService } from 'src/app/core/services/order.service';
import { IOrder } from 'src/app/shared/interfaces/IOrder';
import { OrderCreation } from 'src/app/shared/model/order-creation.model';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  providers: [CurrencyPipe],
})
export class CreateOrderComponent implements OnInit {
  hasCustomerOnLoad = false;
  orderForm: FormGroup;

  get productsForm(): FormArray {
    return <FormArray>this.orderForm.get('products');
  }

  get customerForm(): FormGroup {
    return <FormGroup>this.orderForm.get('customer');
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private orderService: OrderService,
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
        this.getCustomerAndPatchCustomer(+param.get('customerId'));
      }
    });

    this.orderForm = this.fb.group({
      existingCustomerSearch: '',
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
      storeId: [1],
      staffId: [1],
    });
  }

  // Patch the customer form if the query param has customer id
  getCustomerAndPatchCustomer(customerId: number): void {
    this.customerService.getCustomer(customerId).subscribe((customer: ICustomer) => {
      if (customer) {
        this.hasCustomerOnLoad = true;
        this.patchCustomer(customer);
        this.customerForm.markAllAsTouched();
      }
    });
  }

  resetForm(): void {
    this.orderForm.reset();
    this.productsForm.clear();
  }

  // Save the form
  save(): void {
    this.orderService.createOrder(this.prepareOrder()).subscribe(
      (order: IOrder) => {
        console.log(order);
      },
      () => {
        this.growlerService.dangerGrowl('There was a problem saving your order.');
      }
    );
    // console.log(this.orderForm);
    // this.growlerService.growl('Saved Order', GrowlerMessageType.Success);
  }

  private prepareOrder(): IOrderCreation {
    let order = new OrderCreation();
    order = { order, ...this.orderForm.value };
    return order;
  }

  patchCustomer(customer: ICustomer): void {
    this.orderForm.get('customer').patchValue({
      existingCustomerSearch: '',
      customerId: customer.customerId,
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

  loadExample(): void {
    this.customerService.getCustomer(1).subscribe((customer: ICustomer) => {
      this.patchCustomer(customer);
    });

    this.productsForm.clear();

    const filter: ProductFilter = {
      search: '',
      page: 1,
      pageSize: 3,
      minCost: 0,
      maxCost: 9999,
      productId: 0,
    };

    this.productService.getProducts(filter).subscribe((products: IPagedResults<IProduct[]>) => {
      products.results.forEach((product) => {
        this.addProduct(product);
      });
    });
  }

  addProduct(product: IProduct): void {
    this.productsForm.push(
      this.fb.group({
        productId: [product.productId],
        productName: [{ value: product.productName, disabled: true }],
        listPrice: [product.listPrice],
        discount: [0, [Validators.min(0), Validators.max(40)]],
        price: [{ value: product.listPrice, disabled: true }],
        quantity: [1, [Validators.min(1), Validators.max(5)]],
      })
    );
  }
}
