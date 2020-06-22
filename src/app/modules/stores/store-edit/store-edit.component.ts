import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store.service';
import { ActivatedRoute } from '@angular/router';
import { IStore } from 'src/app/shared/interfaces/IStore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IStates } from 'src/app/shared/interfaces/IState';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
})
export class StoreEditComponent implements OnInit {
  store: IStore;
  states: IStates[];
  storeForm: FormGroup;

  get storeFormControl() {
    return this.storeForm.controls;
  }

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private utilsService: UtilsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.storeForm = this.fb.group({
      storeId: { value: 0, disabled: true },
      storeName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.email, Validators.required]],
      street: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });

    this.utilsService.getListOfStates().subscribe((data: IStates[]) => (this.states = data));

    this.route.parent.paramMap.subscribe((params) => {
      this.loadStore(+params.get('id'));
    });
  }

  loadStore(storeId: number): void {
    this.storeService.getStore(storeId).subscribe((data: IStore) => this.onStoreRetrieved(data));
  }

  onStoreRetrieved(store: IStore): void {
    this.store = store;
    this.updateFormData();
  }

  updateFormData(): void {
    const store = this.store;

    this.storeForm.setValue({
      storeId: store.storeId,
      storeName: store.storeName,
      phone: store.phone,
      email: store.email,
      street: store.street,
      city: store.city,
      state: store.state,
      zipCode: store.zipCode,
    });
  }

  resetForm(): void {
    this.updateFormData();
  }

  saveChanges(): void {
    const s = { ...this.store, ...this.storeForm.value };

    console.log(s);
  }
}
