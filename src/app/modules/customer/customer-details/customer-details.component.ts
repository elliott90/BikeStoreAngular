import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ICustomer } from 'src/app/shared/interfaces/ICustomer';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GrowlerService } from 'src/app/core/growler/growler.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Observable } from 'rxjs';
import { IStates } from 'src/app/shared/interfaces/IState';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
})
export class CustomerDetailsComponent implements OnInit {
  customer: ICustomer;
  customerForm: FormGroup;
  pageTitle: string;
  states$: Observable<IStates[]>;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private growlerService: GrowlerService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe((param) => {
      this.getCustomer(+param.get('id'));
    });

    this.states$ = this.utilsService.getListOfStates();

    this.customerForm = this.fb.group({
      customerId: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      email: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  getCustomer(customerId: number): void {
    this.customerService.getCustomer(customerId).subscribe((data: ICustomer) => {
      this.customer = data;
      this.pageTitle = data.customerId === 0 ? 'New Customer' : `${data.firstName} ${data.lastName}`;
      this.patchForm();
    });
  }

  patchForm(): void {
    this.customerForm.patchValue(this.customer);
  }

  saveChanges(): void {
    if (this.customerForm.valid) {
      const customer = { ...this.customer, ...this.customerForm.value };

      if (this.customer.customerId === 0) {
        this.addCustomer(customer);
      } else {
        this.updateCustomer(customer);
      }

      this.router.navigate(['customers']);
    }
  }

  addCustomer(customer: ICustomer): void {
    this.customerService
      .addCustomer(customer)
      .subscribe((data: ICustomer) => this.growlerService.successGrowl(`${data.firstName} ${data.lastName} Added`));
  }

  updateCustomer(customer: ICustomer): void {
    this.customerService.updateCustomer(customer).subscribe(() => {
      this.growlerService.successGrowl(`${customer.firstName} ${customer.lastName} Updated`);
    });
  }
}
