import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/core/services/staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IStaff } from 'src/app/shared/interfaces/IStaff';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/core/services/store.service';
import { IStore } from 'src/app/shared/interfaces/IStore';
import { IApiResponse } from 'src/app/shared/interfaces/IApiResponse';
import { GrowlerService } from 'src/app/core/growler/growler.service';

@Component({
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss'],
})
export class StaffEditComponent implements OnInit {
  staff: IStaff;
  staffForm: FormGroup;
  staffList$: Observable<IStaff[]>;
  storeList$: Observable<IStore[]>;

  hasManager = false;

  constructor(
    private staffService: StaffService,
    private storeService: StoreService,
    private growerService: GrowlerService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe((param) => {
      this.loadStaff(+param.get('id'));
    });

    this.staffForm = this.fb.group({
      staffId: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      active: [true],
      storeId: [0, Validators.required],
      managerId: [0],
    });

    this.staffList$ = this.staffService.getAllStaff();
    this.storeList$ = this.storeService.getAllStores();
  }

  loadStaff(staffId: number): void {
    this.staffService.getStaffById(staffId).subscribe((data: IStaff) => {
      this.staffRetrieved(data);
    });
  }

  staffRetrieved(staff: IStaff): void {
    this.staff = staff;
    this.hasManager = staff.managerId !== null;
    this.staffForm.patchValue(staff);
  }

  saveChanges(): void {
    debugger;
    if (this.staffForm.valid) {
      const staff: IStaff = { ...this.staff, ...this.staffForm.value };

      if (staff.staffId === 0) {
        this.addStaff(staff);
      } else {
        this.updateStaff(staff);
      }
    }
  }

  addStaff(staff: IStaff): void {
    this.staffService.createStaff(staff).subscribe((data: IStaff) => {
      this.growerService.successGrowl(`Added ${data.firstName} ${data.lastName}`);
    });
  }

  updateStaff(staff: IStaff): void {
    this.staffService.updateStaff(staff).subscribe((data: IApiResponse) => {
      this.growerService.successGrowl(`Update ${staff.firstName} ${staff.lastName}`);
    });
  }
}
